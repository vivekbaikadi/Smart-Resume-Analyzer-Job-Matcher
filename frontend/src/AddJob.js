import React, { useState } from 'react';
import axios from 'axios';

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    skills: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('❌ Unauthorized: Please login as a company');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/add-job',
        {
          ...formData,
          skills: formData.skills.split(',').map(s => s.trim())
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMessage(`✅ ${res.data.message}`);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.error || 'Error adding job'}`);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4 text-primary">Add Job <span className="text-muted">(Company Only)</span></h3>
      <form onSubmit={handleSubmit} className="bg-light p-4 shadow rounded">
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input name="title" className="form-control" placeholder="Enter job title" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input name="company" className="form-control" placeholder="Enter company name" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Description</label>
          <textarea name="description" className="form-control" rows="4" placeholder="Describe the job" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Skills (comma separated)</label>
          <input name="skills" className="form-control" placeholder="e.g., JavaScript, HTML, CSS" onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-success w-100">Add Job</button>
      </form>

      {message && <div className="alert mt-3" style={{ color: message.includes('❌') ? 'red' : 'green' }}>{message}</div>}
    </div>
  );
};

export default AddJob;
