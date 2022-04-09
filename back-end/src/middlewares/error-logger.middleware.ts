import {HttpException} from "../utils/api-models/http.exception";
import {NextFunction, Request, Response} from "express";

export const errorLogger = (error: HttpException, req: Request, res: Response, next: NextFunction) => {

    try {

        console.log('Error:', error);

        const status: number = error.status || 500;
        const message: string = error.message || 'Something went wrong';

        console.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
        res.status(status).json({ message });

    } catch (error) {

        next(error);

    }

};