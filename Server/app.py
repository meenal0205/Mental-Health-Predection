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
    
ranking ={'Normal':0,'Stress':1,'Anxiety':2, 'Personality disorder':3,'Depression':4 ,'Bipolar':5,'Suicidal':6}

labels = {0: 'Anxiety', 1: 'Bipolar', 2: 'Depression', 3: 'Normal', 4: 'Personality disorder', 5: 'Stress', 6: 'Suicidal'}


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
    y_predict = model.predict(sentence_combined)
    predicted_label = labels[y_predict[0]]
    return predicted_label


def get_data_by_timedelta(username, days):
    start_date = datetime.today().replace(microsecond=0) - timedelta(days=days)
    query = {
        'username':username,
        'created_at': {"$gte": start_date}
    }
    projection = {
        '_id': 0,
        'created_at': 1,
        'sentiment_score': 1,
        'date': {"$dayOfMonth": "$created_at"},
        'month': {"$month": "$created_at"},
        'year': {"$year": "$created_at"}
    }
    pipeline = [
        {"$match": query},
        {"$project": projection},
        {"$sort": {"created_at": 1}}
    ]

    return list(mongo.db.reports.aggregate(pipeline))


@app.route("/create-diary-entry", methods=['POST'])
def createEntry():
    data = request.get_json()
    diary_title=data['title']
    username=data['username']
    diary_entry= data['diary_entry']
    result = generate(diary_title+diary_entry)
    mongo.db.reports.insert_one({'username':username,'title':diary_title,'content':diary_entry,'created_at':datetime.today().replace(microsecond=0),'created_at': datetime.today().replace(microsecond=0), 'sentiment':result,'sentiment_score':ranking[result]}, )
    return result


@app.route("/update-diary-entry", methods=['POST'])
def updateEntry():
    data = request.get_json()
    diary_title=data['title']
    username=data['user']
    diary_entry= data['diary_entry']
    result = generate(diary_title+diary_entry)
    mongo.db.reports.update_one({'username':username},{'$set':{'title':diary_title,'content':diary_entry,'created_at': datetime.today().replace(microsecond=0), 'sentiment':result,'sentiment_score':ranking[result]}})
    return result


@app.route("/get-weekly-monthly-reports")
def getWeeklyMonthlyReports():
    username = request.args.get('username')
    weekly_data = get_data_by_timedelta(username, 7)
    monthly_data = get_data_by_timedelta(username, 30)

    return jsonify({
        "weekly_report": list(weekly_data),
        "monthly_report": list(monthly_data)
    })


@app.route("/get-reports-by-username")
def getReportsByUsername():
    username = request.args.get('username')
    query = {'username':username}
    projection = {"_id": 0}
    pipeline = [
        {"$match": query},
        {"$project": projection},
        {"$sort": {"created_at": 1}}
    ]
    data = mongo.db.reports.aggregate(pipeline)
    return list(data)


@app.route("/create-user",methods=["POST"])
def createUser():
    data = request.get_json()
    type = data['type']
    username = data['username']
    password = data['password']
    location = data['location']

    if type == 'patient':
         mongo.db.users.insert_one({'username': username, 'password': password, 'type': type, 'location': location, 'therapist': ''})
         return "User created",202
    
    years_of_exp= data['exp']
    userExists = mongo.db.users.find_one({'username': username})
    if userExists:
        return jsonify({"error": "Username already exists"}), 403
    if type == 'therapist':
         mongo.db.users.insert_one({'username': username,'password': password,'type': type,'location': location,'exp': years_of_exp})
         return "User created", 202


@app.route("/login",methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    type = data['type']
    userExists = mongo.db.users.find_one({'username': username}, {"_id": 0})
    if userExists:
        if type != userExists['type']:
            return jsonify({'error': 'Please select correct role'}), 403
        elif password != userExists['password']:
            return jsonify({'error': 'Wrong password'}), 401
        else:
            return jsonify(userExists), 200
    else:
        return jsonify({'error': 'User does not exist. Please register'}), 404  


@app.route("/get-all-therapists")
def getAllTherapists():
    data = mongo.db.users.find({'type':'therapist'},{'_id':0})
    return list(data)


@app.route("/consult-therapist", methods=['POST'])
def consultTherapist():
    data = request.get_json()
    username = data['username']
    therapist = data['therapist']

    result = mongo.db.users.update_one({'username': username}, {"$set": {"therapist": therapist}})
    print(result)
    if result is not None:
        return jsonify({"message": "Successfully consulted"}), 200
    return jsonify({"error": "Couldn't consult the selected therapist. Please try again later"}), 400


@app.route("/get-patients-by-therapist", methods=['GET'])
def getPatientsByTherapist():
    therapist = request.args.get('therapist')
    patients = mongo.db.users.find({"therapist": therapist, "type": "patient"}, {'_id':0})
    return list(patients)


if __name__=='__main__':
    app.run(debug=True)
