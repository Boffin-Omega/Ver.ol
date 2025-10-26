import {Schema, Types} from 'mongoose'

// Interface - Defines the required fields for a single snapshot of the project state
export interface ICommit {
    id: string;  // the commit hash
    author: Types.ObjectId; // reference to the user who pushed the commit
    message: string;
    timestamp: Date;
    gridFSFileId: Types.ObjectId // the unique link to the file content in gridfs
}

// Schema - Defines the structure for an embedded document
export const CommitSchema = new Schema<ICommit> ({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true 
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    message: {
        type: String,
        required: false
    },

    timestamp: {
        type: Date,
        default: Date.now // don't call `now()` here, it's invoked at the time of commit through the constructor
    },

    gridFSFileId: {
        type: Schema.Types.ObjectId,
        required: true
    }
},
{
    _id: false
});

/* 
    Some remarks:

    Setting _id to false tells MongoDB not to assign a default ObjectID
    to this embedded document.
    We use the 'id' (commit hash) as the primary identifier within the schema

    We make use of an embedded array (schema inside a schema) belong to one repository,
    which is highly efficient for fetching history.
*/
