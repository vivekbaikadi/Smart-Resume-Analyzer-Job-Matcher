// backend/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const mongoose = require('mongoose');

// Middleware & Models
const { verifyToken, requireRole } = require('./middleware/auth');
const Job = require('./models/Job');

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const matchRoutes = require('./routes/match');
app.use('/', matchRoutes);



// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Ensure 'uploads/' folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer: File Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// ========== Routes ========== //

// Upload Resume → Parse with Python Flask
app.post('/upload', upload.single('resume'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const formData = new FormData();
    formData.append('resume', fs.createReadStream(filePath));

    const response = await axios.post('http://localhost:5001/parse-resume', formData, {
      headers: formData.getHeaders(),
    });

    fs.unlinkSync(filePath); // delete uploaded file after parsing

    res.json({
      message: 'Resume parsed successfully',
      skills: response.data.skills,
      preview: response.data.text,
    });

  } catch (error) {
    console.error('Error during resume parsing:', error.message);
    res.status(500).json({ error: 'Resume parsing failed' });
  }
});

// Match jobs by resume skills
app.post('/match-jobs', async (req, res) => {
  try {
    const userSkills = req.body.skills.map(skill => skill.toLowerCase());
    const jobs = await Job.find({});

    const matchedJobs = jobs.map(job => {
      const matchCount = job.skills.filter(skill =>
        userSkills.includes(skill.toLowerCase())
      ).length;

      return { ...job.toObject(), matchCount };
    });

    matchedJobs.sort((a, b) => b.matchCount - a.matchCount);

    res.json(matchedJobs.slice(0, 3));
  } catch (error) {
    console.error("Error in /match-jobs:", error.message);
    res.status(500).json({ error: 'Job matching failed.' });
  }
});

// Add Job → Only for logged-in companies
app.post('/add-job', verifyToken, requireRole('company'), async (req, res) => {
  try {
    const newJob = req.body;
    const job = new Job(newJob);
    await job.save();
    res.json({ message: 'Job added successfully!' });
  } catch (err) {
    console.error('Error adding job:', err.message);
    res.status(500).json({ error: 'Failed to add job' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
