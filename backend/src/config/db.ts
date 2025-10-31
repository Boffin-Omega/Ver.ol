import 'dotenv/config';
import mongoose from 'mongoose';
import type {Connection} from 'mongoose'
// mongoURI is either retrieved from .env or resolves to local instance
// local instance is system-specific, add database_name in the URI
const HOST = process.env.DB_HOST||'localhost';
const PORT:number = parseInt(process.env.DB_PORT||'27017')
const DB = process.env.DB_NAME||'repo_files';
const mongoURI: string = process.env.Mongo_URI || `mongodb://${HOST}:${PORT}/${DB}`;


// Connect to MongoDB
const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI);
        console.log(`MongoDB connection successful.`);
    }
    catch (err) {
        console.error(`MongoDB connection failed: ${err as Error}`);
        process.exit(1);
    }
};

const conn: Connection = mongoose.connection;
export {connectDB, conn};