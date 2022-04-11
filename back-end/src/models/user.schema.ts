import bcrypt from "bcrypt";
import mongoose, { PaginateModel } from "mongoose";
import paginate from 'mongoose-paginate-v2';
import { isEmpty } from "../utils/utils.service";
import { E_UserType } from "../utils/static.enums";


export interface IUser extends mongoose.Document{

    firstName?: string;

    lastName: string;

    type: E_UserType;

    emailAddress: string;

    password?: string;

    comparePassword(pwdToCompare: string): Promise<boolean>;

}


const UserSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: E_UserType,
            default: E_UserType.CUS
        },
        emailAddress: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String
        }
    },
    {
        timestamps: true,
        _id: false
    }
);


UserSchema.pre('save', async function (next) {

    let user = this as IUser;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password") || isEmpty(user.password)) return next();

    // Random additional data
    const salt = await bcrypt.genSalt(10);

    // Replace the password with the hash
    user.password = await bcrypt.hash(user.password!, salt);

    return next();

});


// Used for logging in
UserSchema.methods.comparePassword = async function (pwdToCompare: string): Promise<boolean> {

    const user = this as IUser;

    try {

        return await bcrypt.compare(pwdToCompare, user.password!);

    } catch (error) {

        console.log(error);

        return false;

    }

};


// Add paginate plugin
UserSchema.plugin(paginate);


export default mongoose.model<IUser, PaginateModel<IUser>>('Users', UserSchema);
