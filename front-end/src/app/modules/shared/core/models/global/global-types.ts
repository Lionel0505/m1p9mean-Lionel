export interface ISignInResponse {

  token: string,

  token_identifier: string,

  user_type: string,

}

export interface IResponseType<T> {

  status: boolean | number;

  message: string;

  data?: T;

}

