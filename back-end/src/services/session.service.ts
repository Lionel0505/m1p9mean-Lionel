import { generateToken, isEmailValid, isEmpty } from "../utils/utils.service";
import { SignInRequirements } from "../utils/dto/user.dto";
import { ISignInResponse } from "../utils/api-models/global.type";
import User, { IUser } from "../models/user.schema";


export class SessionService {


    public async signIn(signInData: SignInRequirements): Promise<ISignInResponse> {

        if (isEmpty(signInData)) throw new Error('Please fill all the inputs');

        if (!isEmailValid(signInData.emailAddress)) throw new Error('Incorrect email address.');

        const user: IUser | null = await User.findOne({emailAddress: signInData.emailAddress});

        if (isEmpty(user)) throw new Error('Email address not found.');

        const isMatching: boolean = await user!.comparePassword(String(signInData.password));

        if (!isMatching) throw new Error('Incorrect password');

        const token: string = generateToken({user_id: user!._id}, process.env.EXPIRES_IN || '30d');

        return {token: token, user_type: user!.type};

    }

}
