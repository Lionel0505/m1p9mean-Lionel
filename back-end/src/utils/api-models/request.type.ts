import { Request } from "express";
import { IUser } from "../../models/user.schema";


export interface IUserRequest extends Request {

    user: IUser;

}
