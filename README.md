# 🧠 Smart Resume Analyzer & Job Matcher

Smart Resume Analyzer is a full-stack web application that uses **machine learning** and **NLP techniques** to parse resumes and match them with suitable job descriptions. It helps **job seekers** identify relevant opportunities and enables **companies** to quickly filter potential candidates based on skill and role fit.

## 🚀 Key Features

### 👨‍💼 For Job Seekers:
- Upload resume (PDF)
- Automatic skill extraction using NLP
- View matching job roles with match percentage

### 🏢 For Companies:
- Signup/Login as company
- Add new job openings

---

## 🛠️ Technologies Used

### 🔹 Frontend (React.js)
- React Router for navigation
- Axios for HTTP requests
- LocalStorage for auth token storage

### 🔹 Backend (Node.js + Express.js)
- RESTful APIs for authentication, job handling
- JWT for secure login/signup
- MongoDB with Mongoose for storing users, jobs, and applications

### 🔹 Resume Parser (Python)
- NLP libraries (e.g., spaCy, NLTK, or custom)
- PDF parsing using `pdfplumber`
- Skill extraction using NLP
- ML model for ranking match scores

