import mongoose, { Document, Schema, Types} from 'mongoose';
// 1. Define the TypeScript Interface for Mongoose Document (INode is assumed to be defined elsewhere)
export interface IUser extends Document {
    username: string;
    email: string;
    password: string; // Stored as a hash
    repoList: Types.ObjectId[]; // Array of ObjectIds referencing the Repository collection
}
export interface AuthenticatedRequest extends Request {
    user: IUser; // Passport attaches the user object here
}
// 2. Define the Mongoose Schema
const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Important: Prevents the password hash from being returned by default find queries
    },
    repoList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Repository', // Assuming your Repository model is named 'Repository'
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// 3. Export the Mongoose Model
export default mongoose.model<IUser>('User', UserSchema);