import 'dotenv/config';
import { TokenExpiredError } from 'jsonwebtoken';
import { IUserRequest } from "../utils/api-models/request.type";
import { NextFunction, Response } from "express";
import { UserService } from "../services/user.service";
import { ITokenData } from "../utils/api-models/global.type";
import { isEmpty, retrieveTokenData } from "../utils/utils.service";
import { IUser } from "../models/user.schema";
import { HttpException } from "../utils/api-models/http.exception";
import {E_UserType} from "../utils/static.enums";


export const authentication = async (req: IUserRequest, res: Response, next: NextFunction) => {

    try {

        const verificationResponse: ITokenData = await retrieveTokenData(req);
        const userService: UserService = new UserService();
        const userId: string = verificationResponse.user_id!;
        const foundUser: IUser | null = await userService.findUserById(userId!);

        if (!isEmpty(foundUser) && foundUser.type != E_UserType.NOT) {

            req.user = foundUser;
            next();

        } else {

            next(new HttpException(401,'Session not found'));

        }

    } catch (error) {

        if (error instanceof TokenExpiredError) {

            next(new HttpException(402, 'Session expired'));

        } else {

            console.error(error);
            next(new HttpException(401, 'Session not found'));

        }


    }

};
