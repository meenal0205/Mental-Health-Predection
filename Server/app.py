from sklearn.feature_extraction.text import TfidfVectorizer
import pickle
import numpy as np
from scipy.sparse import hstack
import re
from flask import Flask, request,Response, redirect
import requests 

from flask import Flask, jsonify, request, session
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from gridfs import GridFS
from flask_cors import CORS
import os
from datetime import datetime

from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = str(os.getenv('MONGO_URI'))

mongo = PyMongo(app)
CORS(app)

client = MongoClient(str(os.getenv('MONGO_URI')))
db = client.get_database()
fs = GridFS(db)




with open("C:/Major Project/Server/TfidfVectorizer.pkl", 'rb') as f:
    vectorizer = pickle.load(f)

with open("C:/Major Project/Server/LogisticModel.pkl", 'rb') as file:  
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

@app.route("/get-reports-by-userid",)
def getReportsByUserId():
    userid = request.args.get('id')
    data =(mongo.db.reports.find({'userId':int(userid)}, {"_id": 0}))
    return list(data)




    
if __name__=='__main__':
    app.run(debug=True)
