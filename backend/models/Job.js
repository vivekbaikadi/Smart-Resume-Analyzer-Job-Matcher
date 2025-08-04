const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  skills: { type: [String], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
