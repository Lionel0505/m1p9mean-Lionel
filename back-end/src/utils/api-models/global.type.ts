export interface ISignInResponse {

    token: string,

    user_type: string,

}


export interface IResponseType {

    status: boolean | number;

    message: string;

    data?: any;

}


export interface ITokenData {

    jti?: string;

    user_id?: string;

    iat?: any;

    exp?: any;

    email?: any;

}
