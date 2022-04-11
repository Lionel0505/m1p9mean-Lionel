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

export interface IBenefitsFilter {

  page: number;

  limit: number;

  restaurant?: string;

  dateRange?: { date1: string, date2: string };

}
