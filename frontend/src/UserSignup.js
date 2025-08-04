// import React, { useState } from 'react';
// import axios from 'axios';

// const UserSignup = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const [message, setMessage] = useState('');

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/signup/user', formData);
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.error || 'Signup failed');
//     }
//   };

//   return (
//     <div>
//       <h2>User Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Name" onChange={handleChange} required /><br />
//         <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />
//         <button type="submit">Sign Up</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default UserSignup;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup/user', formData);
      setMessage('✅ User registered! Redirecting to login...');
      setTimeout(() => navigate('/login-user'), 2000); // Redirect after delay
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ Signup failed');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center text-success mb-4">User Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Sign Up
          </button>
        </form>

        {message && (
          <div className="alert alert-info text-center mt-3" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSignup;
