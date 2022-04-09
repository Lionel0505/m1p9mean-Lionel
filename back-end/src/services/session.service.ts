import TokenBlackList, {ITokenBlacklist} from "../models/token-blacklist.schema";
import mongoose from "mongoose";
import {generateToken, isEmailValid, isEmpty, retrieveToken, retrieveTokenData} from "../utils/utils.service";
import {SignInRequirements} from "../utils/dto/user.dto";
import {ISignInResponse, ITokenData} from "../utils/api-models/global.type";
import User, {IUser} from "../models/user.schema";
import {IUserRequest} from "../utils/api-models/request.type";


export class SessionService {

    public async signIn(signInData: SignInRequirements): Promise<ISignInResponse> {

        if (isEmpty(signInData)) throw new Error('Please fill all the inputs');

        if (!isEmailValid(signInData.emailAddress)) throw new Error('Incorrect email address.');

        const user: IUser | null = await User.findOne({ emailAddress: signInData.emailAddress });

        if (isEmpty(user)) throw new Error('Email address not found.');

        const isMatching: boolean = await user!.comparePassword(String(signInData.password));

        if (!isMatching) throw new Error('Incorrect password');

        const token: string = generateToken({ user_id: user!._id }, process.env.EXPIRES_IN || '30d');

        return { token: token, user_type: user!.type }

    }


    public async signOut(request: IUserRequest): Promise<boolean> {

        try {

            const token: string = retrieveToken(request);

            const tokenData: ITokenData = await retrieveTokenData(request);

            const blacklistedToken: ITokenBlacklist | null = await this.saveTokenInBlacklist(tokenData.user_id!, token);

            return isEmpty(blacklistedToken);

        } catch (e) {

            console.log(e);
            return false;

        }

    }


    public async findTokenInBlacklist(tokenIdentifier: string): Promise<ITokenBlacklist> {

        if (isEmpty(tokenIdentifier)) throw new Error('No token identifier found');

        return await TokenBlackList
            .findOne({
                tokenIdentifier: tokenIdentifier
            })
            .lean();

    }


    public async findTokenInBlacklistById(id: string): Promise<ITokenBlacklist> {

        if (isEmpty(id)) throw new Error('No token identifier found');

        return await TokenBlackList
            .findOne({
                _id: id
            })
            .populate('user')
            .lean();

    }


    public async saveTokenInBlacklist(userId: string, tokenIdentifier: string): Promise<ITokenBlacklist> {

        const session = new TokenBlackList({
            _id: String(new mongoose.mongo.ObjectId()),
            user: userId,
            tokenIdentifier: tokenIdentifier
        });

        await session.save();

        return await this.findTokenInBlacklistById(session._id);

    }

}
