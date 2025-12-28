import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    fatherName: {
        type: String,
        required: true,
        default: 'Not Provided'
    },
    motherName: {
        type: String,
        required: true,
        default: 'Not Provided'
    },
    dateOfBirth: {
        type: Date,
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
        enum: ['Residential', 'Non-Residential', 'Day-Care']
    }


},   { timestamps: true })

const StudentProfile = mongoose.model('Student', studentSchema);

export default StudentProfile;