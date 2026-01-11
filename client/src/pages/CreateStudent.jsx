import React, { useState, useEffect } from "react";
import { api } from "../utils/api.js";
import "./CreateStudent.scss";
import NavBar from "../components/NavBar/NavBar.jsx";
import { InitialStudentForm, ClassLabels, ClassOptions } from '../utils/studentConstants.js';

const CreateStudent = ({ studentToEdit = null, onClose = null, onSuccess = null }) => {
    const [formData, setFormData] = useState(InitialStudentForm);
    const [batchCategory, setBatchCategory] = useState("");
    const [message, setMessage] = useState("");
    const [statusType, setStatusType] = useState("");

    // 1. Detect Edit Mode & Populate Data
    useEffect(() => {
        if (studentToEdit) {
            const mappedData = {
                ...InitialStudentForm,
                ...studentToEdit,
                name: studentToEdit.userId?.name || "",
                mobile: studentToEdit.userId?.mobile || "",
                email: studentToEdit.userId?.email || "",
            };
            setFormData(mappedData);

            // Auto-select Batch Category based on class
            const foundBatch = Object.keys(ClassOptions).find(key => 
                ClassOptions[key].includes(studentToEdit.classGrade)
            );
            if (foundBatch) {
                setBatchCategory(foundBatch.charAt(0).toUpperCase() + foundBatch.slice(1));
            }
        }
    }, [studentToEdit]);

    const getClassOptions = () => {
        const key = batchCategory ? batchCategory.toLowerCase() : "";
        return ClassOptions[key] || [];
    };

    const handleBatchChange = (e) => {
        setBatchCategory(e.target.value);
        setFormData((prev) => ({ ...prev, classGrade: "" }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === "checkbox" ? checked : value;
        
        setFormData((prev) => {
            const newData = { ...prev, [name]: inputValue };
            
            // Auto-reset group if class is not 9-12
            if (name === "classGrade") {
                const groupClasses = ["9", "10", "11", "12"];
                if (!groupClasses.includes(value)) newData.group = "N/A";
            }
            
            // Auto-reset transport if not day-care
            if (name === "residentialStatus" && value !== "Day-Care") {
                newData.isUsingTransport = false;
            }
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Processing...");
        setStatusType("info");

        // --- FIX START: Sanitize Data ---
        // Create a copy so we don't affect the form UI
        const payload = { ...formData };

        // If email is empty string, remove it entirely so backend sees it as undefined
        if (!payload.email || payload.email.trim() === "") {
            delete payload.email;
        }

        // If dateOfBirth is empty, remove it to prevent date parsing errors
        if (!payload.dateOfBirth) {
            delete payload.dateOfBirth;
        }
        // --- FIX END ---

        try {
            let response;
            if (studentToEdit) {
                response = await api.put(`api/students/${studentToEdit._id}`, payload);
            } else {
                response = await api.post("api/students/create", payload);
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Operation failed");
            }

            setMessage(studentToEdit ? "Updated Successfully!" : `Success! Student ${data.user.name} created.`);
            setStatusType("success");

            if (studentToEdit) {
                if (onSuccess) onSuccess(); 
                setTimeout(() => { if (onClose) onClose(); }, 1500);
            } else {
                // Reset form if creating new
                setFormData(InitialStudentForm);
                setBatchCategory("");
            }

        } catch (error) {
            setMessage(`Error: ${error.message}`);
            setStatusType("error");
            console.error(error);
        }
    };

    const showGroupOptions = ["9", "10", "11", "12"].includes(formData.classGrade);
    const isModal = !!studentToEdit; 

    return (
        <>
            {/* FIX: NavBar is strictly outside the container */}
            {!isModal && <NavBar />}
            
            <div className={isModal ? "create-student-modal-content" : "create-user"}>
                <div className="header-row">
                    <h2>{isModal ? "Edit Student Profile" : "Register New Student"}</h2>
                    {isModal && (
                        <button type="button" onClick={onClose} className="close-btn">X</button>
                    )}
                </div>

                {message && <p className={`message ${statusType}`}>{message}</p>}

                <form onSubmit={handleSubmit} className="student-form-grid">
                    {/* --- Left Column: Basic User Info --- */}
                    <div className="column">
                        <h3>Basic Information</h3>
                        <div className="form-group">
                            <label>Student Name (English) *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Mobile No. (Login ID) *</label>
                            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
                        </div>

                        <h4>Personal Information</h4>
                        <div className="form-group">
                            <label>শিক্ষার্থীর নাম (বাংলা)</label>
                            <input type="text" name="nameBN" value={formData.nameBN} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Email (Optional)</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Father's Name</label>
                            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>বাবার নাম (বাংলা)</label>
                            <input type="text" name="fatherNameBN" value={formData.fatherNameBN} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Mother's Name</label>
                            <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>মায়ের নাম (বাংলা)</label>
                            <input type="text" name="motherNameBN" value={formData.motherNameBN} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Religion</label>
                            <select name="religion" value={formData.religion} onChange={handleChange} required>
                                <option value="">Select Religion</option>
                                <option value="Islam">Islam</option>
                                <option value="Hinduism">Hinduism</option>
                                <option value="Christianity">Christianity</option>
                                <option value="Buddhism">Buddhism</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* --- Right Column: Academic Info --- */}
                    <div className="column">
                        <h3>Academic Profile</h3>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input 
                                type="date" 
                                name="dateOfBirth" 
                                value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Birth Certificate No.</label>
                            <input type="text" name="birthCertificateNo" value={formData.birthCertificateNo} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Father's NID</label>
                            <input type="text" name="fatherNID" value={formData.fatherNID} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Mother's NID</label>
                            <input type="text" name="motherNID" value={formData.motherNID} onChange={handleChange} />
                        </div>

                        {/* Batch Selection */}
                        <div className="batch-selector">
                            <label>Select Batch</label>
                            <div className="batch-options">
                                {Object.keys(ClassOptions).map(cat => (
                                    <label key={cat}>
                                        <input 
                                            type="radio" 
                                            name="batchCat" 
                                            value={cat.charAt(0).toUpperCase() + cat.slice(1)}
                                            checked={batchCategory.toLowerCase() === cat.toLowerCase()}
                                            onChange={handleBatchChange} 
                                        />
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Class *</label>
                            <select 
                                name="classGrade" 
                                value={formData.classGrade} 
                                onChange={handleChange} 
                                required 
                                disabled={!batchCategory} 
                                style={{ backgroundColor: !batchCategory ? "#f0f0f0" : "white" }}
                            >
                                <option value="">{!batchCategory ? "Select Batch First" : "Select Class"}</option>
                                {getClassOptions().map((cls) => (
                                    <option key={cls} value={cls}>{ClassLabels[cls]}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Version *</label>
                            <select name="version" value={formData.version} onChange={handleChange} required>
                                <option value="">Select Version</option>
                                <option value="Bangla">Bangla</option>
                                <option value="English">English</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Group</label>
                            <select 
                                name="group" 
                                value={formData.group} 
                                onChange={handleChange} 
                                disabled={!showGroupOptions} 
                                style={{ backgroundColor: !showGroupOptions ? "#f0f0f0" : "white" }}
                            >
                                {showGroupOptions ? (
                                    <>
                                        <option value="">Select Group</option>
                                        <option value="Science">Science</option>
                                        <option value="Commerce">Commerce</option>
                                        <option value="Arts">Arts</option>
                                    </>
                                ) : (<option value="N/A">N/A (General)</option>)}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Residential Status</label>
                            <select name="residentialStatus" value={formData.residentialStatus} onChange={handleChange}>
                                <option value="">Select Status</option>
                                <option value="Non-Residential">Non-Residential</option>
                                <option value="Residential">Residential</option>
                                <option value="Day-Care">Day-Care</option>
                            </select>
                        </div>
                        
                        {formData.residentialStatus === "Day-Care" && (
                            <div className="form-group">
                                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                                    <input 
                                        type="checkbox" 
                                        name="isUsingTransport" 
                                        checked={formData.isUsingTransport} 
                                        onChange={handleChange} 
                                        style={{ width: "20px", height: "20px" }} 
                                    />
                                    <span>Request School Transport?</span>
                                </label>
                            </div>
                        )}
                    </div>

                    <button type="submit">
                        {isModal ? "Update Profile" : "Create Student Profile"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateStudent;