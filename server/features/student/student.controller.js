import User from "../user/user.model.js";
import StudentProfile from "./student.model.js";
import bcryptjs from "bcryptjs";

const { SALT_ROUNDS } = process.env;

export const createStudent = async (req, res) => {
    try {
        const {
            // User Data
            name,
            mobile,
            email,
            nameBN,
            // Student Profile Data
            fatherName,
            motherName,
            fatherNameBN,
            motherNameBN,
            dateOfBirth,
            birthCertificateNo,
            fatherNID,
            motherNID,
            classGrade,
            version,
            group,
            residentialStatus,
            isUsingTransport,
        } = req.body;

        // 1. Check if user already exists
        const checkQuery = [{ mobile }];
        if (email) checkQuery.push({ email });

        const existingUser = await User.findOne({ $or: checkQuery });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User with this mobile or email already exists" });
        }

        // 2. Prepare Password (Default to Mobile Number if not provided)
        const plainPassword = mobile; // Setting mobile as default password
        const saltRounds = parseInt(SALT_ROUNDS) || 10;
        const hashedPassword = await bcryptjs.hash(plainPassword, saltRounds);

        // 3. Create the User Document
        const newUser = new User({
            name,
            mobile,
            email: email || undefined, // undefined lets the sparse index ignore it
            password: hashedPassword,
            role: "student",
            status: "active",
        });

        const savedUser = await newUser.save();

        // 4. Create the Student Profile Document
        const newProfile = new StudentProfile({
            userId: savedUser._id,
            nameBN,
            fatherName,
            motherName,
            fatherNameBN,
            motherNameBN,
            dateOfBirth,
            birthCertificateNo,
            fatherNID,
            motherNID,
            classGrade,
            version,
            group,
            residentialStatus,
            isUsingTransport,
        });

        await newProfile.save();

        res.status(201).json({
            message: "Student and Profile created successfully",
            user: savedUser,
            profile: newProfile,
        });
    } catch (error) {
        console.error("Error creating student:", error);
        // Optional: If profile creation fails, you might want to delete the user created in step 3
        // await User.findByIdAndDelete(savedUser._id);
        res
            .status(500)
            .json({ message: "Error creating student", error: error.message });
    }
};
