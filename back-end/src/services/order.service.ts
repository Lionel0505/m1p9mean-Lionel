import mongoose, { PaginateResult } from "mongoose";
import Order, { IOrder } from "../models/order.schema";
import Dish, { IDish } from "../models/dish.schema";
import User, { IUser } from '../models/user.schema';
import { customLabels, isEmpty } from "../utils/utils.service";
import { IUserRequest } from "../utils/api-models/request.type";
import { OrderDto } from "../utils/dto/order.dto";
import { UserService } from "./user.service";
import { E_DeliveryStatus } from "../utils/static.enums";
import { IBenefitsFilter } from "../utils/api-models/benefits.model";


export class OrderService {

    private userService: UserService = new UserService();


    public async findBenefits(filterData: IBenefitsFilter): Promise<any> {

        if (isEmpty(filterData)) throw new Error('Missing filterData');

        const query = {
            status: E_DeliveryStatus.DEL
        };

        const result = {};

        if (!isEmpty(filterData.restaurant)) {

            Object.assign(query, {
                restaurant: filterData.restaurant
            });

        }

        if (!isEmpty(filterData.dateRange)) {

            Object.assign(query, {
                updateAt: {$gte: filterData.dateRange!.date1, $lte: filterData.dateRange!.date2}
            });

        }

        const orders = await Order
            .find({...query})
            .skip((filterData.page - 1) * filterData.limit)
            .limit(filterData.limit)
            .lean();

        orders = orders.map()

        return result;

    }


    public async findOrders(query: any, options: any): Promise<PaginateResult<IOrder>> {

        query = isEmpty(query) ? {} : query;

        options = Object.assign(isEmpty(options) ? {} : options, {
            lean: true,
            allowDiskUse: true,
            customLabels: customLabels(),
            populate: [
                {
                    path: 'customer',
                    model: User
                },
                {
                    path: 'restaurant',
                    model: User
                },
                {
                    path: 'deliveryMan',
                    model: User
                },
                {
                    path: 'dishes.dish',
                    model: Dish
                }
            ],
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


    public async updateOrder(orderId: string, orderData: OrderDto): Promise<IOrder> {

        if (isEmpty(orderId)) throw new Error('No ID found');

        if (isEmpty(orderData)) throw new Error('No updated data found');

        if (!(Object.values(E_DeliveryStatus).includes(orderData.status as E_DeliveryStatus))) throw new Error('Incorrect order status.');

        const currentOrder: IOrder | null = await Order.findById(orderId);

        if (isEmpty(currentOrder)) throw new Error('No order found');

        currentOrder!.status = orderData.status as E_DeliveryStatus;

        if (!isEmpty(orderData.deliveryMan)) currentOrder!.deliveryMan = orderData.deliveryMan!;

        await currentOrder!.save();

        return await this.findOrderById(orderId);

    }


    public async saveOrder(request: IUserRequest, orderData: OrderDto): Promise<IOrder> {

        if (isEmpty(orderData)) throw new Error('Please fill all the inputs?');

        if (isEmpty(request.user)) throw new Error('No restaurant found');

        if (request.user._id != orderData.customer) throw new Error('Session mismatch!');

        let deliveryMan: IUser;

        if (!isEmpty(orderData.deliveryMan)) {

            deliveryMan = await this.userService.findUserById(orderData.deliveryMan!);

            if (isEmpty(deliveryMan)) throw new Error('No delivery man found.');

        }

        const dishes: IDish = await Dish
            .find({_id: {$in: orderData.dishes.map((element: { dish: string, quantity: number }) => element.dish)}})
            .lean();

        if (isEmpty(dishes)) throw new Error('No dishes found');

        try {

            Object.assign(orderData, {
                customer: request.user._id!,
                _id: String(new mongoose.mongo.ObjectId())
            });

            const order = new Order({...orderData});

            await order.save();

            return await this.findOrderById(String(order._id));

        } catch (e) {

            console.log(e);
            throw e;

        }

    }

}
