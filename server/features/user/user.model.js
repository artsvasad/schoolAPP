import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        sparse: true,
        trim: true,
        lowercase: true

    },
    password: {
        type: String,
        required: true

    },
    role: {
        type: String,
        enum: ['super', 'admin', 'teacher', 'student', 'desk'],
        default: 'student'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'blocked'],
        default: 'active'
    }
}, { timestamps: true });
userSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
})
const User = mongoose.model('User', userSchema)

export default User