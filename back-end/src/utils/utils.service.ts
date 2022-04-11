import 'dotenv/config';
import validator from 'validator';
import jsonwebtoken from 'jsonwebtoken';
import * as CryptoJS from 'crypto-js';
import { IResponseType, ITokenData } from "./api-models/global.type";
import { IUserRequest } from "./api-models/request.type";
import * as _ from "lodash";
import { constants } from "./config/constants.config";


const ENCRYPTION_KEY: string = process.env.ENCRYPTION_KEY || '624d9ae426624d9ae426a0624db2e1567624d624d9ae426624d9ae426a0624db2e1567624db';

const SECRET_KEY: string = process.env.SECRET_KEY || 'secret-key';

const nodemailer = require('nodemailer');

const generator = require('generate-password');

export const groupByKey = (list: any, key: any, {omitKey = false}) =>
    list.reduce(
        (hash: any, {[key]: value, ...rest}) =>
            ({
                ...hash,
                [value]: (hash[value] || []).concat(omitKey ? {...rest} : {[key]: value, ...rest})
            }),
        {}
    );


export const groupBy = (list: any, key: string) => {

    return _.mapValues(
        _.groupBy(list, key),
        (result: any) => result.map((car: any) => _.omit(car, key))
    );

};

export const customLabels: () => any = (): any => {

    return constants.custom_labels;

}


export const generatePassword: () => string = (): string => {

    const options = constants.password_options;

    return generator.generate(options);

};


export const sendEmail: (recipients: string | string[], topic: string, message: string, isHtml: boolean, cc?: string | string[], bcc?: string | string[], attachments?: any) => Promise<boolean> = async (recipients: string | string[], topic: string, message: string, isHtml: boolean, cc?: string | string[], bcc?: string | string[], attachments?: any): Promise<boolean> => {

    const transporter = nodemailer.createTransport(constants.nodemailer_options);

    let mailOptions = {
        from: constants.nodemailer_options.auth.user,
        to: recipients,
        subject: topic
    };

    if (isHtml) {

        mailOptions = Object.assign(mailOptions, {html: message});

    } else {

        mailOptions = Object.assign(mailOptions, {text: message});

    }

    if (!isEmpty(cc)) {

        mailOptions = Object.assign(mailOptions, {cc: cc});

    }

    if (!isEmpty(bcc)) {

        mailOptions = Object.assign(mailOptions, {bcc: bcc});

    }

    if (!isEmpty(attachments)) {

        mailOptions = Object.assign(mailOptions, {attachments: attachments});

    }

    console.log(mailOptions)

    return new Promise((resolve, reject) => {

        transporter.sendMail(mailOptions, function (error: any, info: any) {

            if (error) {

                console.log("Email error: ", error);

                reject(error);

            } else {

                const result: string = 'Email sent: ' + info.response;
                console.log(result);
                resolve(true);

            }

        });

    });

}


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

    const response: IResponseType = {message: isEmpty(message) ? 'Data found' : message!, status: status};

    if (!isEmpty(data)) Object.assign(response, {data: data!});

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
