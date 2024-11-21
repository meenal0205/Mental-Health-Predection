import pickle
import numpy as np
from scipy.sparse import hstack
import re
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from gridfs import GridFS
from flask_cors import CORS
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = str(os.getenv('MONGO_URI'))

mongo = PyMongo(app)
CORS(app)

client = MongoClient(str(os.getenv('MONGO_URI')))
db = client.get_database() 
fs = GridFS(db)

with open("./Server/TfidfVectorizer.pkl", 'rb') as f:
    vectorizer = pickle.load(f)

with open("./Server/LogisticModel.pkl", 'rb') as file:  
    model = pickle.load(file)


def remove_patterns(text):
    text = re.sub(r'http[s]?://\S+', '', text)
    text = re.sub(r'\[.*?\]\(.*?\)', '', text)
    text = re.sub(r'@\w+', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    return text.strip()


def generate(sentence):
    sentence_tfidf = vectorizer.transform([sentence])
    num_of_characters = len(sentence)
    num_of_sentences = sentence.count('.') + sentence.count('!') + sentence.count('?')  
    sentence_num = np.array([[num_of_characters, num_of_sentences]])
    sentence_combined = hstack([sentence_tfidf, sentence_num])
    labels = {0: 'Anxiety', 1: 'Bipolar', 2: 'Depression', 3: 'Normal', 4: 'Personality disorder', 5: 'Stress', 6: 'Suicidal'}
    y_predict = model.predict(sentence_combined)
    predicted_label = labels[y_predict[0]]
    return predicted_label


ranking ={'Normal':0,'Stress':1,'Anxiety':2, 'Personality disorder':3,'Depression':4 ,'Bipolar':5,'Suicidal':6}


@app.route("/create-diary-entry", methods=['POST'])
def createEntry():
    data = request.get_json()
    diary_title=data['title']
    user_id=data['user']
    diary_entry= data['diary_entry']
    result = generate(diary_title+diary_entry)
    mongo.db.reports.insert_one({'userId':user_id,'title':diary_title,'content':diary_entry,'created_at':datetime.today().replace(microsecond=0),'updated_at': datetime.today().replace(microsecond=0), 'sentiment':result,'sentiment_score':ranking[result]}, )
    return result


@app.route("/create-user",methods=["POST"])
def createUser():
    data = request.get_json()
    username=data['username']
    password=data['password']
    type= data['type']
    location = data['location']
    years_of_exp= data['exp']
    userExists = mongo.db.users.find_one({'username':username})
    if(userExists):
        return "username already exists"
    if(type=='therapist'):
         mongo.db.users.insert_one({'username':username,'password':password,'type':type,'location':location,'exp':years_of_exp})
    else:
         mongo.db.users.insert_one({'username':username,'password':password,'type':type,'location':location})

    return data


@app.route("/get-all-therapists")
def getAllTherapists():
    data = mongo.db.users.find({"type":"therapist"})
    return list(data)


@app.route("/login",methods=['POST'])
def login():
    data = request.get_json()
    username=data['username']
    password=data['password']
    userExists = mongo.db.users.find_one({'username':username})
    if(userExists and username==userExists['username'] and password==userExists['password']):
        return data
    return "user does not exist please register."    


@app.route("/update-diary-entry", methods=['POST'])
def updateEntry():
    data = request.get_json()
    diary_title=data['title']
    user_id=data['user']
    diary_entry= data['diary_entry']
    result = generate(diary_title+diary_entry)
    mongo.db.reports.update_one({'userId':user_id},{'$set':{'title':diary_title,'content':diary_entry,'updated_at': datetime.today().replace(microsecond=0), 'sentiment':result,'sentiment_score':ranking[result]}})
    return result


@app.route("/get-reports-by-userid",)
def getReportsByUserId():
    userid = request.args.get('id')
    data = mongo.db.reports.find({'userId':int(userid)}, {"_id": 0})
    return list(data)


def get_data_by_timedelta(user_id, days):
    start_date = datetime.today().replace(microsecond=0) - timedelta(days=days)
    query = {
        'userId': int(user_id),
        'updated_at': {"$gte": start_date}
    }
    projection = {
        '_id': 0,
        'updated_at': 1,
        'sentiment_score': 1,
        'date': {"$dayOfMonth": "$created_at"},
        'month': {"$month": "$created_at"},
        'year': {"$year": "$created_at"}
    }
    pipeline = [
        {"$match": query},
        {"$project": projection},
        {"$sort": {"updated_at": 1}}
    ]

    return list(mongo.db.reports.aggregate(pipeline))


@app.route("/get-weekly-monthly-reports")
def getWeeklyMonthlyReports():
    userid = request.args.get('id')
    weekly_data = get_data_by_timedelta(userid, 7)
    monthly_data = get_data_by_timedelta(userid, 30)

    return jsonify({
        "weekly_report": list(weekly_data),
        "monthly_report": list(monthly_data)
    })


if __name__=='__main__':
    app.run(debug=True)
