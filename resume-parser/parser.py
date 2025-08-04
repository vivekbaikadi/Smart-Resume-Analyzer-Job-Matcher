# # resume-parser/parser.py
# from flask import Flask, request, jsonify
# import pdfplumber
# import os
# import spacy

# app = Flask(__name__)
# nlp = spacy.load("en_core_web_sm")

# # Predefined skill keywords (can expand later)
# SKILLS_DB = [
#     "python", "java", "react", "node", "machine learning",
#     "html", "css", "javascript", "sql", "mongodb",
#     "docker", "flask", "spring boot", "git"
# ]

# def extract_text_from_pdf(pdf_path):
#     text = ""
#     with pdfplumber.open(pdf_path) as pdf:
#         for page in pdf.pages:
#             text += page.extract_text() + "\n"
#     return text

# def extract_skills(text):
#     doc = nlp(text.lower())
#     skills_found = set()
#     for token in doc:
#         if token.text in SKILLS_DB:
#             skills_found.add(token.text)
#     return list(skills_found)

# @app.route('/parse-resume', methods=['POST'])
# def parse_resume():
#     file = request.files.get('resume')
#     if not file:
#         return jsonify({'error': 'No file uploaded'}), 400

#     file_path = os.path.join('uploads', file.filename)
#     file.save(file_path)

#     try:
#         text = extract_text_from_pdf(file_path)
#         skills = extract_skills(text)
#         os.remove(file_path)  # Clean up uploaded file
#         return jsonify({'skills': skills, 'text': text[:500] + '...'})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     if not os.path.exists('uploads'):
#         os.makedirs('uploads')
#     app.run(port=5001)


# resume-parser/parser.py
from flask import Flask, request, jsonify
import pdfplumber
import os
import spacy
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Initialize Flask app and Spacy
app = Flask(__name__)
nlp = spacy.load("en_core_web_sm")

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI") or "your_fallback_uri"
client = MongoClient(MONGO_URI)
db = client['smart-resume']  # Match this with your backend DB name
job_collection = db.jobs  # This must match the collection name used in MongoDB

# Function to fetch all unique skills from job posts
def get_dynamic_skills():
    skills_from_db = job_collection.distinct("skills")  # unique skills
    return [skill.lower() for skill in skills_from_db]

# PDF parsing
def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

# Skill matching
def extract_skills(text, skill_keywords):
    doc = nlp(text.lower())
    found = set()
    for token in doc:
        if token.text in skill_keywords:
            found.add(token.text)
    return list(found)

# Endpoint to handle resume parsing
@app.route('/parse-resume', methods=['POST'])
def parse_resume():
    file = request.files.get('resume')
    if not file:
        return jsonify({'error': 'No file uploaded'}), 400

    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    try:
        text = extract_text_from_pdf(file_path)
        dynamic_skills = get_dynamic_skills()
        skills = extract_skills(text, dynamic_skills)
        os.remove(file_path)  # Clean up
        return jsonify({'skills': skills, 'text': text[:500] + '...'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ensure uploads folder exists and run Flask
if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(port=5001)
