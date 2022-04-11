import mongoose, { PaginateResult } from "mongoose";
import User, { IUser } from '../models/user.schema';
import Order from '../models/order.schema';
import { customLabels, isEmailValid, isEmpty } from "../utils/utils.service";
import { SignUpRequirements } from "../utils/dto/user.dto";
import { E_DeliveryStatus, E_UserType } from "../utils/static.enums";


export class UserService {

    public async findUserById(userID: string): Promise<IUser> {

        if (isEmpty(userID)) throw new Error('No ID found');

        return await User
            .findById(userID)
            .select('-password')
            .lean() as IUser;

    }


    public async createUser(userData: SignUpRequirements): Promise<IUser> {

        if (isEmpty(userData)) throw new Error('No data found');

        if (isEmpty(userData.password)) throw new Error('Missing password');

        if (!isEmailValid(userData.emailAddress)) throw new Error('Incorrect email address.');

        if (!(Object.values(E_UserType).includes(userData.type as E_UserType)) || userData.type == E_UserType.NOT) throw new Error('Incorrect user type.');

        Object.assign(userData, { _id: String(new mongoose.mongo.ObjectId()) });

        const createdUser = new User({ ...userData });

        await createdUser.save();

        return await this.findUserById(createdUser._id);

    }


    public async removeUser(userID: string): Promise<IUser> {

        if (isEmpty(userID)) throw new Error('No ID found');

        let currentUser: IUser = await this.findUserById(userID);

        if (isEmpty(currentUser)) throw new Error('No user to delete found');

        await User
            .deleteOne({ _id: userID })
            .exec();

        return currentUser!;

    }


    public async updateUser(userID: string, userData: SignUpRequirements): Promise<IUser> {

        if (isEmpty(userID)) throw new Error('No ID found');

        if (isEmpty(userData)) throw new Error('No updated data found');

        const currentUser: IUser | null = await User.findById(userID);

        if (isEmpty(currentUser)) throw new Error('No user found');

        currentUser!.firstName = userData.firstName;
        currentUser!.lastName = userData.lastName;
        currentUser!.emailAddress = userData.emailAddress;

        if (!isEmpty(userData.password)) currentUser!.password = userData.password;

        await currentUser!.save();

        return await this.findUserById(userID);

    }


    public async findDeliveryMen(): Promise<IUser[]> {

        const nonAvailableOnes: string[] = await Order
            .find({ deliveryMan: { $exists: true }, status: { $in: [E_DeliveryStatus.TOD, E_DeliveryStatus.INI] } })
            .distinct('deliveryMan')
            .lean();

        return await User
            .find({_id: { $not: { $in: nonAvailableOnes } }, type: E_UserType.DEM})
            .select('-password')
            .lean();

    }


    public async findUsers(query: any, options: any): Promise<PaginateResult<IUser>> {

        query = isEmpty(query) ? {} : query;

        options = Object.assign(isEmpty(options) ? {} : options, {
            select: '-password',
            lean: true,
            allowDiskUse: true,
            customLabels: customLabels()
        });

        return await User
            .paginate(
                { ...query },
                { ...options }
            );

    }

}
