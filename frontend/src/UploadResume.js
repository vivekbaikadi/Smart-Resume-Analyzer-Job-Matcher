// import React, { useState } from 'react';
// import axios from 'axios';

// function UploadResume() {
//     const [file, setFile] = useState(null);
//     const [message, setMessage] = useState("");
//     const [skills, setSkills] = useState([]);
//     const [preview, setPreview] = useState("");
//     const [matchedJobs, setMatchedJobs] = useState([]);

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };


//     const handleUpload = async () => {
//         if (!file) {
//             setMessage("Please select a file first.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("resume", file);

//         try {
//             const res = await axios.post("http://localhost:5000/upload", formData);
//             setMessage(res.data.message);
//             setSkills(res.data.skills);
//             setPreview(res.data.preview);

//             // Match jobs with parsed skills
//             // const matchRes = await axios.post("http://localhost:5000/match-jobs", {
//             //     skills: res.data.skills,
//             // });
//             // setMatchedJobs(matchRes.data);

//             // Match jobs with parsed skills
//             const matchRes = await axios.post("http://localhost:5000/match-jobs", {
//                 skills: res.data.skills,
//             });
//             console.log("Parsed Skills:", res.data.skills);
//             console.log("Matched Jobs Response:", matchRes.data);

//             setMatchedJobs(matchRes.data); 


//         } catch (err) {
//             setMessage("Upload failed.");
//             console.error(err);
//         }
//     };

//     return (
//         <div style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
//             <h2>Upload Your Resume</h2>
//             <input type="file" accept=".pdf" onChange={handleFileChange} />
//             <br /><br />
//             <button onClick={handleUpload}>Upload</button>
//             <p>{message}</p>

//             {/* Display extracted skills */}
//             {skills.length > 0 && (
//                 <>
//                     <h3>Extracted Skills</h3>
//                     <ul>
//                         {skills.map((skill, index) => (
//                             <li key={index}>{skill}</li>
//                         ))}
//                     </ul>
//                 </>
//             )}

//             {/* Display preview text */}
//             {preview && (
//                 <>
//                     <h3>Resume Text Preview</h3>
//                     <div style={{ whiteSpace: "pre-wrap", background: "#f7f7f7", padding: 10, maxHeight: 200, overflowY: "auto", borderRadius: 5 }}>
//                         {preview}
//                     </div>
//                 </>
//             )}

//             {Array.isArray(matchedJobs) && matchedJobs.length > 0 && (
//                 <>
//                     <h3>Top Matching Jobs</h3>
//                     <ul>
//                         {matchedJobs.map((job, index) => (
//                             <li key={index}>
//                                 <strong>{job.title}</strong> at {job.company} <br />
//                                 Matching Skills: {Array.isArray(job.skills) ? job.skills.join(", ") : "N/A"} <br />
//                                 Match Score: {(job.matchScore * 100).toFixed(1)}%
//                             </li>
//                         ))}
//                     </ul>
//                 </>
//             )}


//         </div>
//     );
// }

// export default UploadResume;



import React, { useState } from 'react';
import axios from 'axios';

function UploadResume() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [skills, setSkills] = useState([]);
    const [preview, setPreview] = useState("");
    const [matchedJobs, setMatchedJobs] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("resume", file);

        try {
            const res = await axios.post("http://localhost:5000/upload", formData);
            setMessage(res.data.message);
            setSkills(res.data.skills);
            setPreview(res.data.preview);

            const matchRes = await axios.post("http://localhost:5000/match-jobs", {
                skills: res.data.skills,
            });

            setMatchedJobs(matchRes.data);
        } catch (err) {
            setMessage("Upload failed.");
            console.error(err);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-4 shadow" style={{ maxWidth: '800px', width: '100%' }}>
                <h2 className="text-primary mb-4">Upload Your Resume</h2>

                <div className="mb-3">
                    <input type="file" accept=".pdf" className="form-control" onChange={handleFileChange} />
                </div>

                <button className="btn btn-primary mb-3" onClick={handleUpload}>Upload</button>

                {message && (
                    <div className="alert alert-info">{message}</div>
                )}

                {skills.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-success">Extracted Skills</h4>
                        <ul className="list-group">
                            {skills.map((skill, index) => (
                                <li key={index} className="list-group-item">{skill}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {preview && (
                    <div className="mt-4">
                        <h4 className="text-secondary">Resume Preview</h4>
                        <div className="bg-light p-3 rounded overflow-auto" style={{ maxHeight: "200px", whiteSpace: "pre-wrap" }}>
                            {preview}
                        </div>
                    </div>
                )}

                {matchedJobs.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-warning">Top Matching Jobs</h4>
                        <div className="row">
                            {matchedJobs.map((job, index) => (
                                <div key={index} className="col-md-6 mb-3">
                                    <div className="card border-primary shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <span className="badge bg-primary">{job.title}</span>
                                            </h5>
                                            <h6 className="card-subtitle mb-2 text-muted">
                                                <span className="badge bg-secondary">Company : {job.company}</span>
                                            </h6>
                                            <p className="mb-2">
                                                <strong>Matching Skills:</strong><br />
                                                {Array.isArray(job.matchedSkills) && job.matchedSkills.length > 0 ? (
                                                    job.matchedSkills.map((skill, idx) => (
                                                        <span key={idx} className="badge bg-success me-1">{skill}</span>
                                                    ))
                                                ) : (
                                                    <span className="text-muted">None</span>
                                                )}
                                            </p>
                                            <div className="progress mb-2" style={{ height: '20px' }}>
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{ width: `${(job.matchScore * 100).toFixed(1)}%` }}
                                                >
                                                    {(job.matchScore * 100).toFixed(1)}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default UploadResume;
