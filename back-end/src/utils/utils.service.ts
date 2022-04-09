import 'dotenv/config';
import validator from "validator";
import jsonwebtoken from "jsonwebtoken";
import {IResponseType, ITokenData} from "./api-models/global.type";
import * as CryptoJS from 'crypto-js';
import {IUserRequest} from "./api-models/request.type";


const ENCRYPTION_KEY: string = process.env.ENCRYPTION_KEY || '624d9ae426624d9ae426a0624db2e1567624d624d9ae426624d9ae426a0624db2e1567624db';

const SECRET_KEY: string = process.env.SECRET_KEY || 'secret-key';


export const retrieveToken: (req: IUserRequest) => string = (req: IUserRequest): string => {

    const authorization: string | null = req!.header('Authorization')!.split('Bearer ')[1] || null;

    if (isEmpty(authorization))
        throw new Error('Session not found');

    return authorization!;

}


export const retrieveTokenData: (req: IUserRequest) => Promise<ITokenData> = async (req: IUserRequest): Promise<ITokenData> => {

    return await verifyToken(retrieveToken(req));

}


export const encrypt: (value: string) => string = (value: string): string => {

    if (isEmpty(value) || isEmpty(value.trim())) throw new Error('Value not found');

    return CryptoJS.AES.encrypt(value.trim(), ENCRYPTION_KEY).toString();

}


export const decrypt: (value: string) => string = (value: string): string => {

    if (isEmpty(value) || isEmpty(value.trim())) throw new Error('Value not found');

    return CryptoJS.AES.decrypt(value.trim(), ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);

}


export const isEmailValid = (email: string): boolean => {

    try {

        return validator.isEmail(email);

    } catch (error) {

        console.log(error);

        return false;

    }

}


export const generateToken: (tokenData: ITokenData, expiresIn: string) => string = (tokenData: ITokenData, expiresIn: string): string => {

    return jsonwebtoken.sign(tokenData, SECRET_KEY, {expiresIn});

}


export const verifyToken: (token: string) => Promise<ITokenData> = async (token: string): Promise<ITokenData> => {

    return await jsonwebtoken.verify(token, SECRET_KEY) as ITokenData;

}


export const formatResponse = async (status: number, message?: string, data?: any): Promise<IResponseType> => {

    const response: IResponseType = { message: isEmpty(message) ? 'Data found' : message!, status: status };

    if (!isEmpty(data)) Object.assign(response, { data: data! });

    return response;

};


export const isEmpty = (value: any): boolean => {

    return (
        value === null || // check for null
        value === undefined || // check for undefined
        value === '' || // check for empty string
        (Array.isArray(value) && value.length === 0) || // check for empty array
        (typeof value === 'object' && Object.keys(value).length === 0) // check for empty object
    );

}
