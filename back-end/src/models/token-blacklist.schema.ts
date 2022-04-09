import mongoose from "mongoose";
import { IUser } from "./user.schema";


export interface ITokenBlacklist extends mongoose.Document {

    tokenIdentifier: string;

    user: IUser;

}


const TokenBlacklistSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        tokenIdentifier: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
        _id: false
    }
);


export default mongoose.model<ITokenBlacklist>('TokenBlacklist', TokenBlacklistSchema);
