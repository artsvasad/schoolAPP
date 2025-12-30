import React, { useState } from "react";
import { api } from './api.js';

const CreateStudent = () => {
    const [formData, setFormData] = useState({
        // User Basic Info
        name: '',
        mobile: '',
        email: '',

        // Student Profile Info (FIXED NAMING TO MATCH BACKEND)
        fatherName: '',   // Was fathersName
        motherName: '',   // Was mothersName
        dateOfBirth: '',  // Was dob
        classGrade: '',
        version: 'Bangla',
        group: 'N/A',
        residentialStatus: 'Non-Residential'
    });

    const [message, setMessage] = useState('');
    const [statusType, setStatusType] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Processing...');
        setStatusType('info');

        try {
            const response = await api.post('api/students/create', formData);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Student creation failed');
            }

            setMessage(`Success! Student ${data.user.name} created. (Password: ${data.user.mobile})`);
            setStatusType('success');

            // Reset form
            setFormData({
                name: '', mobile: '', email: '',
                fatherName: '', motherName: '', dateOfBirth: '',
                classGrade: '', version: 'Bangla', group: 'N/A',
                residentialStatus: 'Non-Residential'
            });

        } catch (error) {
            setMessage(`Error: ${error.message}`);
            setStatusType('error');
            console.error(error);
        }
    };

    return (
        <div className="create-user">    <Header />
            <NavBar />
            <h2>Register New Student</h2>
            {message && <p className={`message ${statusType}`}>{message}</p>}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

                {/* --- Left Column: Basic User Info --- */}
                <div className="column">
                    <h3>Basic Information</h3>
                    <div className="form-group">
                        <label>Student Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" />
                    </div>
                    <div className="form-group">
                        <label>Mobile No. (Login ID) *</label>
                        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="017..." />
                    </div>
                    <div className="form-group">
                        <label>Email (Optional)</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="student@example.com" />
                    </div>
                    <div className="form-group">
                        <label>Father's Name *</label>
                        {/* FIXED NAME */}
                        <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Mother's Name *</label>
                        {/* FIXED NAME */}
                        <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} required />
                    </div>
                </div>

                {/* --- Right Column: Academic Info --- */}
                <div className="column">
                    <h3>Academic Profile</h3>
                    <div className="form-group">
                        <label>Date of Birth *</label>
                        {/* FIXED NAME */}
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Class *</label>
                        <select name="classGrade" value={formData.classGrade} onChange={handleChange} required>
                            <option value="">Select Class</option>
                            <option value="Play">Play</option>
                            <option value="Nursery">Nursery</option>
                            <option value="KG">KG</option>
                            <option value="1">Class 1</option>
                            <option value="2">Class 2</option>
                            <option value="3">Class 3</option>
                            <option value="4">Class 4</option>
                            <option value="5">Class 5</option>
                            <option value="6">Class 6</option>
                            <option value="7">Class 7</option>
                            <option value="8">Class 8</option>
                            <option value="9">Class 9</option>
                            <option value="10">Class 10</option>
                            <option value="11">Class 11</option>
                            <option value="12">Class 12</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Version *</label>
                        <select name="version" value={formData.version} onChange={handleChange}>
                            <option value="Bangla">Bangla</option>
                            <option value="English">English</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Group</label>
                        <select name="group" value={formData.group} onChange={handleChange}>
                            <option value="N/A">N/A (Play - Class 8)</option>
                            <option value="Science">Science</option>
                            <option value="Commerce">Commerce</option>
                            <option value="Arts">Arts</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Residential Status</label>
                        <select name="residentialStatus" value={formData.residentialStatus} onChange={handleChange}>
                            <option value="Non-Residential">Non-Residential</option>
                            <option value="Residential">Residential</option>
                            <option value="Day-Care">Day-Care</option>
                        </select>
                    </div>
                </div>

                <button type="submit" style={{ gridColumn: 'span 2', marginTop: '10px' }}>Create Student Profile</button>
            </form>

            <style jsx>{`
                .create-user { max-width: 800px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                .form-group { margin-bottom: 15px; display: flex; flex-direction: column; }
                label { font-weight: bold; margin-bottom: 5px; font-size: 0.9rem; color: #333; }
                input, select { padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem; }
                button { background-color: #0070f3; color: white; padding: 12px; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: bold; }
                button:hover { background-color: #005bb5; }
                .message { padding: 10px; border-radius: 4px; margin-bottom: 20px; text-align: center; }
                .message.success { color: #155724; background-color: #d4edda; border: 1px solid #c3e6cb; }
                .message.error { color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; }
                .message.info { color: #0c5460; background-color: #d1ecf1; border: 1px solid #bee5eb; }
                .column { padding: 10px; }
            `}</style>
        </div>
    );
};

export default CreateStudent;