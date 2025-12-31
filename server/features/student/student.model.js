import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    nameBN: {
        type: String,
        trim: true,
    },
    fatherName: {
        type: String,
        trim: true,

    },
    fatherNameBN: {
        type: String,
        trim: true,
    },

    fatherNID: {
        type: String,
        trim: true,
    },
    motherNID: {
        type: String,
        trim: true,
    },

    motherName: {
        type: String,
        trim: true,
    },
    motherNameBN: {
        type: String,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
    },
    birthCertificateNo: {
        type: String,
        trim: true,
    },
    classGrade: {
        type: String,
        enum: ['Play', 'Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

    },
    version: {
        type: String,
        enum: ['Bangla', 'English']
    },
    group: {
        type: String,
        enum: ['Science', 'Commerce', 'Arts', 'N/A'],
        default: 'N/A'
    },
    residentialStatus: {
        type: String,
        enum: ['Residential', 'Non-Residential', 'Day-Care', 'Night-Care', 'N/A']
    },
    religion: {
        type: String,
        enum: ['Islam', 'Hinduism', 'Christianity', 'Buddhism', 'Other']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    isUsingTransport: {
        type: Boolean,
        default: false
    },


}, { timestamps: true })

const StudentProfile = mongoose.model('Student', studentSchema);

export default StudentProfile;