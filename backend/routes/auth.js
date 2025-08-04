const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET in auth.js:', JWT_SECRET);



// --- USER SIGNUP ---
router.post('/signup/user', async (req, res) => {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    try {
        const user = new User({ name, email, password: hashed });
        await user.save();
        res.json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(400).json({ error: 'User signup failed: ' + err.message });
    }
});

// --- COMPANY SIGNUP ---
router.post('/signup/company', async (req, res) => {
    const { companyName, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    try {
        const company = new Company({ companyName, email, password: hashed });
        await company.save();
        res.json({ message: 'Company registered successfully!' });
    } catch (err) {
        res.status(400).json({ error: 'Company signup failed: ' + err.message });
    }
});

// --- USER LOGIN ---
router.post('/login/user', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: 'user' }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { name: user.name, email: user.email } });
});

// --- COMPANY LOGIN ---
router.post('/login/company', async (req, res) => {
    const { email, password } = req.body;
    const company = await Company.findOne({ email });

    if (!company || !(await bcrypt.compare(password, company.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: company._id, role: 'company' }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, company: { companyName: company.companyName, email: company.email } });
});

module.exports = router;
