import mongoose from 'mongoose'

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("DB connected");
    })

    mongoose.connection.on('error', (err) => {
        console.error("MongoDB connection error:", err.message);
    })

    mongoose.connection.on('disconnected', () => {
        console.log("MongoDB disconnected");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}`, {
        serverSelectionTimeoutMS: 10000,  // Timeout after 10s instead of 30s
        socketTimeoutMS: 45000,
    })

}

export default connectDB;