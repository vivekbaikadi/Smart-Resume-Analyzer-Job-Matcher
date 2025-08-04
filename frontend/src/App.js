// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserSignup from './UserSignup';
import CompanySignup from './CompanySignup';
import UserLogin from './UserLogin';
import CompanyLogin from './CompanyLogin';
import AddJob from './AddJob';
import UploadResume from './UploadResume';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup/user" element={<UserSignup />} />
          <Route path="/signup/company" element={<CompanySignup />} />
          <Route path="/login/user" element={<UserLogin />} />
          <Route path="/login/company" element={<CompanyLogin />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/upload" element={<UploadResume />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
