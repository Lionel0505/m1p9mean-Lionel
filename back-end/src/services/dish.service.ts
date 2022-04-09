import mongoose, { PaginateResult } from "mongoose";
import { isEmpty, retrieveTokenData } from "../utils/utils.service";
import { IUserRequest } from "../utils/api-models/request.type";
import { OrderDto } from "../utils/dto/order.dto";
import { ITokenData } from "../utils/api-models/global.type";
import Dish, { IDish } from "../models/dish.schema";
import { DishDto } from "../utils/dto/dish.dto";


export class DishService {


    public async findDishes(query: any, options: any): Promise<PaginateResult<IDish>> {

        query = isEmpty(query) ? {} : query;

        options = Object.assign(isEmpty(options) ? {} : options, {
            select: '-password',
            lean: true,
            allowDiskUse: true
        });

        return await Dish
            .paginate(
                {...query},
                {...options}
            );

    }


    public async findDishById(dishId: string): Promise<IDish> {

        if (isEmpty(dishId)) throw new Error('No ID found');

        return Dish
            .findById(dishId)
            .lean();

    }


    public async createDish(request: IUserRequest, dishData: DishDto): Promise<IDish> {

        if (isEmpty(dishData)) throw new Error('Please fill all the inputs?');

        const tokenData: ITokenData = await retrieveTokenData(request);

        Object.assign(dishData, {
            customer: tokenData.user_id!,
            _id: String(new mongoose.mongo.ObjectId())
        });

        try {

            const dish = new Dish({...dishData});

            await dish.save();

            return await this.findDishById(String(dish._id));

        } catch (e) {

            console.log(e);
            throw e;

        }

    }


}
