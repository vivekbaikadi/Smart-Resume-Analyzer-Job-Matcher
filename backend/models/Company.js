const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: String,
    email: { type: String, unique: true },
    password: String, // Hashed password
});

module.exports = mongoose.model('Company', companySchema);
