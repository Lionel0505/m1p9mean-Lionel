import mongoose, { PaginateResult } from "mongoose";
import Order, { IOrder } from "../models/order.schema";
import Dish, { IDish } from "../models/dish.schema";
import { isEmpty, retrieveTokenData } from "../utils/utils.service";
import { IUserRequest } from "../utils/api-models/request.type";
import { OrderDto } from "../utils/dto/order.dto";
import { ITokenData } from "../utils/api-models/global.type";
import { IUser } from "../models/user.schema";
import { UserService } from "./user.service";


export class OrderService {

    private userService: UserService = new UserService();


    public async findOrders(query: any, options: any): Promise<PaginateResult<IOrder>> {

        query = isEmpty(query) ? {} : query;

        options = Object.assign(isEmpty(options) ? {} : options, {
            select: '-password',
            lean: true,
            allowDiskUse: true
        });

        return await Order
            .paginate(
                {...query},
                {...options}
            );

    }


    public async findOrderById(orderId: string): Promise<IOrder> {

        if (isEmpty(orderId)) throw new Error('No ID found');

        return Order
            .findById(orderId)
            .lean();

    }


    public async saveOrder(request: IUserRequest, orderData: OrderDto): Promise<IOrder> {

        if (isEmpty(orderData)) throw new Error('Please fill all the inputs?');

        const tokenData: ITokenData = await retrieveTokenData(request);

        const deliveryMan: IUser = await this.userService.findUserById(orderData.deliveryMan);

        if (isEmpty(deliveryMan)) throw new Error('No delivery man found');

        const dishes: IDish = await Dish
            .find({ _id: orderData.dishes })
            .lean();

        if (isEmpty(dishes)) throw new Error('No dishes found');

        Object.assign(orderData, {
            customer: tokenData.user_id!,
            _id: String(new mongoose.mongo.ObjectId())
        });

        try {

            const order = new Order({...orderData});

            await order.save();

            return await this.findOrderById(String(order._id));

        } catch (e) {

            console.log(e);
            throw e;

        }

    }

}
