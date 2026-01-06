import mongoose from "mongoose"
import 'dotenv/config'

const MONGO_URI = process.env.MONGO_URI

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}


async function connectDB() {

    if (!MONGO_URI) {
        const error = new Error("No MONGO_URI in environment variables")
        console.error(error.message)
        throw error
    }
    if (cached.conn) {
        console.log('Using cached DB Connection')
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
        }

        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            console.log('New DB Connection Established')
            return mongoose
        })

    }
    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        console.error("MongoDB connection failed: ", error)
        throw error

    }
    return cached.conn
}


export default connectDB


