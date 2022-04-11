import {IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {IUser} from "../../models/user.schema";
import {E_UserType} from "../static.enums";
import {isEmpty} from "../utils.service";


export class SignInRequirements {

    constructor(emailAddress: IUser["emailAddress"], password: IUser["password"]) {

        this.emailAddress = emailAddress;
        this.password = password;

    }


    @IsEmail()
    @IsNotEmpty()
    emailAddress: IUser['emailAddress'];

    @IsString()
    @IsNotEmpty()
    password: IUser['password'];

}


export class SignUpRequirements {

    constructor(lastName: IUser["lastName"], type: IUser["type"], emailAddress: IUser["emailAddress"], firstName?: IUser["firstName"], password?: IUser["password"]) {

        this.lastName = lastName;
        this.type = Object.values(E_UserType).includes(type as E_UserType) ? type : E_UserType.NOT;
        this.emailAddress = emailAddress;

        if (!isEmpty(firstName)) this.firstName = firstName;
        if (!isEmpty(password)) this.password = password;

    }

    @IsString()
    @IsOptional()
    firstName?: IUser['firstName'];

    @IsString()
    @IsNotEmpty()
    lastName: IUser['lastName'];

    @IsString()
    @IsNotEmpty()
    type: IUser['type'];

    @IsEmail()
    @IsNotEmpty()
    emailAddress: IUser['emailAddress'];

    @IsString()
    @IsOptional()
    password?: IUser['password'];

}
