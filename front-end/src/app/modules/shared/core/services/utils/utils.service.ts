import { environment } from "../../../../../../environments/environment";
import * as CryptoJS from 'crypto-js';
import apiConfig from '../../../../../../assets/api.config.json';


const ENCRYPTION_KEY: string = apiConfig.encryption_key;


export const encrypt: (value: string) => string = (value: string): string => {

  if (isEmpty(value) || isEmpty(value.trim())) throw new Error('Value not found');

  return CryptoJS.AES.encrypt(value.trim(), ENCRYPTION_KEY).toString();

}


export const decrypt: (value: string) => string = (value: string): string => {

  if (isEmpty(value) || isEmpty(value.trim())) throw new Error('Value not found');

  return CryptoJS.AES.decrypt(value.trim(), ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);

}


export const baseUrl = (urlPart: string): string => {

  return environment.base_url + urlPart;

}


export const isEmpty = (value: any): boolean => {

  return (
    value === null || // check for null
    value === undefined || // check for undefined
    value === '' || // check for empty string
    (Array.isArray(value) && value.length === 0) || // check for empty array
    (typeof value === 'object' && Object.keys(value).length === 0) // check for empty object
  );

}
