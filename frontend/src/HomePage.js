// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const HomePage = () => {
//     const [role, setRole] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const userRole = localStorage.getItem('role');

//         if (!token || !userRole) {
//             navigate('/login');
//         } else {
//             setRole(userRole);
//         }
//     }, [navigate]);

//     const handleLogout = () => {
//         const role = localStorage.getItem('role');
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');

//         if (role === 'company') {
//             navigate('/login-company');
//         } else {
//             navigate('/login-user');
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <div className="text-center p-5">
//                 <h1 className="mb-4">Welcome to Smart Resume Analyzer</h1>
//                 <p className="lead">
//                     You are logged in as a <strong>{role === 'company' ? 'Company' : 'User'}</strong>
//                 </p>

//                 {role === 'company' ? (
//                     <button
//                         className="btn btn-primary me-2"
//                         onClick={() => navigate('/add-job')}
//                     >
//                         Add a Job
//                     </button>
//                 ) : (
//                     <button
//                         className="btn btn-primary me-2"
//                         onClick={() => navigate('/upload')}
//                     >
//                         Upload Resume
//                     </button>
//                 )}

//                 <button
//                     className="btn btn-outline-danger mt-3 d-block mx-auto"
//                     onClick={handleLogout}
//                 >
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default HomePage;







import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [role, setRole] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');

        if (token && userRole) {
            setIsAuthenticated(true);
            setRole(userRole);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setRole('');
    };

    return (
        <div className="container mt-5">
            <div className="text-center p-5">
                <h1 className="mb-4">Welcome to Smart Resume Analyzer</h1>

                {isAuthenticated ? (
                    <>
                        <p className="lead">
                            You are logged in as a <strong>{role === 'company' ? 'Company' : 'User'}</strong>
                        </p>

                        {role === 'company' ? (
                            <button
                                className="btn btn-primary me-2"
                                onClick={() => navigate('/add-job')}
                            >
                                Add a Job
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary me-2"
                                onClick={() => navigate('/upload')}
                            >
                                Upload Resume
                            </button>
                        )}

                        <button
                            className="btn btn-outline-danger mt-3 d-block mx-auto"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <p className="lead">Please select your role to login or signup:</p>

                        <div className="row justify-content-center mt-4">
                            {/* User Section */}
                            <div className="col-md-4">
                                <div className="card p-3 shadow-sm">
                                    <h4>Job Seeker</h4>
                                    <button
                                        className="btn btn-outline-primary my-2"
                                        onClick={() => navigate('/login/user')}
                                    >
                                        Login as User
                                    </button>
                                    <button
                                        className="btn btn-outline-success"
                                        onClick={() => navigate('/signup/user')}
                                    >
                                        Signup as User
                                    </button>
                                </div>
                            </div>

                            {/* Company Section */}
                            <div className="col-md-4">
                                <div className="card p-3 shadow-sm">
                                    <h4>Company</h4>
                                    <button
                                        className="btn btn-outline-primary my-2"
                                        onClick={() => navigate('/login/company')}
                                    >
                                        Login as Company
                                    </button>
                                    <button
                                        className="btn btn-outline-success"
                                        onClick={() => navigate('/signup/company')}
                                    >
                                        Signup as Company
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage;
