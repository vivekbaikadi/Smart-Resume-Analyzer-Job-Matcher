// routes/match.js
const express = require('express');
const Job = require('../models/Job');

const router = express.Router();

router.post('/match-jobs', async (req, res) => {
  let { skills } = req.body;

  if (!skills || !Array.isArray(skills)) {
    return res.status(400).json({ error: 'Skills array required' });
  }

  // Normalize to lowercase
  skills = skills.map(skill => skill.toLowerCase());

  try {
    const jobs = await Job.find();
    const matchedJobs = [];

    jobs.forEach(job => {
      const jobSkills = job.skills.map(skill => skill.toLowerCase());
      const matched = jobSkills.filter(skill => skills.includes(skill));
      const score = matched.length / jobSkills.length;

      if (score > 0) {
        matchedJobs.push({ ...job._doc, matchScore: score, matchedSkills: matched });
      }
    });

    matchedJobs.sort((a, b) => b.matchScore - a.matchScore);

    // ✅ Send array directly
    res.json(matchedJobs);
  } catch (err) {
    console.error("Error matching jobs:", err.message);
    res.status(500).json({ error: 'Failed to match jobs' });
  }
});

module.exports = router;
