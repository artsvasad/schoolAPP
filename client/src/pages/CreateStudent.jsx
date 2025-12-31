import React, { useState, useEffect } from "react";
import { api } from "../utils/api.js";
import "./CreateStudent.scss";

const CreateStudent = () => {
    const [formData, setFormData] = useState({
        // User Basic Info
        name: "",
        nameBN: "",
        mobile: "",
        email: "",
        religion: "",
        gender: "",

        // Student Profile Info
        fatherName: "",
        fatherNameBN: "",
        motherName: "",
        motherNameBN: "",
        dateOfBirth: "",
        birthCertificateNo: "",
        fatherNID: "",
        motherNID: "",

        // Academic Info

        classGrade: "",
        version: "",
        group: "N/A",
        residentialStatus: "",
        isUsingTransport: false,
    });

    const [batchCategory, setBatchCategory] = useState("");
    const [message, setMessage] = useState("");
    const [statusType, setStatusType] = useState("");

    const classLabels = {
        Play: "Play",
        Nursery: "Nursery",
        KG: "Kindergarten",
        1: "One",
        2: "Two",
        3: "Three",
        4: "Four",
        5: "Five",
        6: "Six",
        7: "Seven",
        8: "Eight",
        9: "Nine",
        10: "Ten",
        11: "Eleven",
        12: "Twelve",
    };
    const classOptions = {
        primary: ["Play", "Nursery", "KG", "1", "2", "3", "4", "5"],
        cadet: ["6", "7", "8"],
        school: ["6", "7", "8", "9", "10", "11", "12"],
    };
    const getClassOptions = () => {
        const key = batchCategory ? batchCategory.toLowerCase() : "";
        return classOptions[key] || [];
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

            if (name === "classGrade") {
                const groupClasses = ["9", "10", "11", "12"];
                if (!groupClasses.includes(value)) {
                    newData.group = "N/A";
                }
            }

            if (name === "residentialStatus") {
                if (value !== "Day-Care") {
                    newData.isUsingTransport = false;
                }
            }
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Processing...");
        setStatusType("info");

        try {
            const response = await api.post("api/students/create", formData);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Student creation failed");
            }

            setMessage(
                `Success! Student ${data.user.name} created. (Password: ${data.user.mobile})`
            );
            setStatusType("success");

            // Reset form
            setFormData({
                name: "",
                nameBN: "",
                mobile: "",
                email: "",
                religion: "",
                gender: "",

                // Student Profile Info
                fatherName: "",
                fatherNameBN: "",
                motherName: "",
                motherNameBN: "",
                dateOfBirth: "",
                birthCertificateNo: "",
                fatherNID: "",
                motherNID: "",

                // Academic Info
                batchCategory: "",
                classGrade: "",
                version: "",
                group: "N/A",
                residentialStatus: "",
                isUsingTransport: false,
            });
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            setStatusType("error");
            console.error(error);
        }
    };

    const showGroupOptions = ["9", "10", "11", "12"].includes(
        formData.classGrade
    );

    /* Same  funciton handing in  different ways 
    
    
            const getClassOptions = () => {
            switch (batchCategory) {
                case 'primary':
                    return classOptions.primary;
                case 'cadet':
                    return classOptions.cadet;
                case 'school':
                    return classOptions.school;
                default:
                    return [];
            }   
        }
    
    
    
        */

    return (
        <div className="create-user">
            <h2>Register New Student</h2>
            {message && <p className={`message ${statusType}`}>{message}</p>}

            <form
                onSubmit={handleSubmit}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
            >
                {/* --- Left Column: Basic User Info --- */}
                <div className="column">
                    <h3>Basic Information</h3>
                    <div className="form-group">
                        <label>Student Name (English) *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Full Name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Mobile No. (Login ID) *</label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                            placeholder="017..."
                        />
                    </div>

                    <h4>Personal Information</h4>
                    <div className="form-group">
                        <label>শিক্ষার্থীর নাম (বাংলা)</label>
                        <input
                            type="text"
                            name="nameBN"
                            value={formData.nameBN}
                            onChange={handleChange}
                            placeholder="Full Name (Bangla)"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email (Optional)</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="student@example.com"
                        />
                    </div>
                    <div className="form-group">
                        <label>Father's Name (English)</label>
                        {/* FIXED NAME */}
                        <input
                            type="text"
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>বাবার নাম (বাংলা)</label>
                        {/* FIXED NAME */}
                        <input
                            type="text"
                            name="fatherNameBN"
                            value={formData.fatherNameBN}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Mother's Name (English)</label>
                        {/* FIXED NAME */}
                        <input
                            type="text"
                            name="motherName"
                            value={formData.motherName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>মায়ের নাম (বাংলা)</label>
                        {/* FIXED NAME */}
                        <input
                            type="text"
                            name="motherNameBN"
                            value={formData.motherNameBN}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Religion</label>
                        <select
                            name="religion"
                            value={formData.religion}
                            onChange={handleChange}
                        >
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
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
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
                        <label>Date of Birth </label>
                        {/* FIXED NAME */}
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Birth Certificate No.</label>
                        <input
                            type="text"
                            name="birthCertificateNo"
                            value={formData.birthCertificateNo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Father's NID</label>
                        <input
                            type="text"
                            name="fatherNID"
                            value={formData.fatherNID}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Mother's NID</label>
                        <input
                            type="text"
                            name="motherNID"
                            value={formData.motherNID}
                            onChange={handleChange}
                        />
                    </div>

                    {/* === NEW: BATCH SELECTION === */}
                    <div
                        className="form-group"
                        style={{
                            background: "#f8f9fa",
                            padding: "10px",
                            borderRadius: "5px",
                            marginBottom: "15px",
                        }}
                    >
                        <label
                            style={{
                                marginBottom: "5px",
                                display: "block",
                                fontWeight: "bold",
                            }}
                        >
                            Select Batch
                        </label>
                        <div style={{ display: "flex", gap: "15px" }}>
                            <label style={{ cursor: "pointer" }}>
                                <input
                                    type="radio"
                                    name="batchCat"
                                    value="Primary"
                                    checked={batchCategory === "Primary"}
                                    onChange={handleBatchChange}
                                />{" "}
                                Primary
                            </label>

                            <label style={{ cursor: "pointer" }}>
                                <input
                                    type="radio"
                                    name="batchCat"
                                    value="School"
                                    checked={batchCategory === "School"}
                                    onChange={handleBatchChange}
                                />{" "}
                                School
                            </label>
                            <label style={{ cursor: "pointer" }}>
                                <input
                                    type="radio"
                                    name="batchCat"
                                    value="Cadet"
                                    checked={batchCategory === "Cadet"}
                                    onChange={handleBatchChange}
                                />{" "}
                                Cadet
                            </label>
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
                            <option value="">
                                {!batchCategory ? "Select Batch First" : "Select Class"}{" "}
                            </option>
                            {getClassOptions().map((cls) => (
                                <option key={cls} value={cls}>
                                    {classLabels[cls]}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Version *</label>
                        <select
                            name="version"
                            value={formData.version}
                            onChange={handleChange}
                        >
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
                            style={{
                                backgroundColor: !showGroupOptions ? "#f0f0f0" : "white",
                            }}
                        >
                            {showGroupOptions ? (
                                <>
                                    <option value="">Select Group</option>
                                    <option value="Science">Science</option>
                                    <option value="Commerce">Commerce</option>
                                    <option value="Arts">Arts</option>
                                </>
                            ) : (
                                <option value="N/A">N/A (General)</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Residential Status</label>
                        <select
                            name="residentialStatus"
                            value={formData.residentialStatus}
                            onChange={handleChange}
                        >
                            <option value="">Select Status</option>
                            <option value="Non-Residential">Non-Residential</option>
                            <option value="Residential">Residential</option>
                            <option value="Day-Care">Day-Care</option>
                        </select>
                    </div>
                    {formData.residentialStatus === "Day-Care" && (
                        <div className="form-group">
                            <label
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    cursor: "pointer",
                                }}
                            >
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

                <button
                    type="submit"
                    style={{ gridColumn: "span 2", marginTop: "10px" }}
                >
                    Create Student Profile
                </button>
            </form>
        </div>
    );
};

export default CreateStudent;
