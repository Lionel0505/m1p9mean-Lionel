import { BaseSchema } from "./base.schema";


export interface IUser extends BaseSchema {

  firstName?: string;

  lastName: string;

  type: string;

  emailAddress: string;

  password?: string;

}
