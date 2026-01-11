import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const fixDatabase = async () => {
    console.log("1. Connecting to Database...");
    // Ensure this matches your .env variable name (MONGO_URI or MONGODB_URI)
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    try {
        await mongoose.connect(uri);
        console.log("✅ Connected.");

        const collection = mongoose.connection.collection('users');
        
        // We need to drop the index 'email_1' because it is currently NOT sparse
        console.log("2. Attempting to delete the bad index...");
        
        try {
            await collection.dropIndex('email_1');
            console.log("🎉 SUCCESS: The bad 'Unique' rule has been deleted.");
        } catch (err) {
            console.log("ℹ️ Note: Index 'email_1' was not found (or already deleted).");
        }

    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        await mongoose.disconnect();
        console.log("3. Done. You can restart your server now.");
    }
};

fixDatabase();