import mongoose, { PaginateResult } from "mongoose";
import { customLabels, isEmpty } from "../utils/utils.service";
import { IUserRequest } from "../utils/api-models/request.type";
import Dish, { IDish } from "../models/dish.schema";
import { DishDto } from "../utils/dto/dish.dto";


export class DishService {


    public async findDishes(query: any, options: any): Promise<PaginateResult<IDish>> {

        query = isEmpty(query) ? {} : query;

        options = Object.assign(isEmpty(options) ? {} : options, {
            lean: true,
            allowDiskUse: true,
            customLabels: customLabels()
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

        if (isEmpty(request.user)) throw new Error('No restaurant found');

        if (request.user._id != dishData.restaurant) throw new Error('Session mismatch!');

        Object.assign(dishData, {
            restaurant: request.user._id,
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


    public async updateDish(dishID: string, dishData: DishDto, request: IUserRequest): Promise<IDish> {

        if (isEmpty(dishID)) throw new Error('No ID found');

        if (isEmpty(dishData)) throw new Error('No updated data found');

        if (isEmpty(request.user)) throw new Error('No restaurant found');

        if (request.user._id != dishData.restaurant) throw new Error('Session mismatch!');

        const currentDish: IDish | null = await Dish.findById(dishID);

        if (isEmpty(currentDish)) throw new Error('No user found');

        currentDish!.name = dishData.name;
        currentDish!.costPrice = dishData.costPrice;
        currentDish!.salePrice = dishData.salePrice;
        currentDish!.purchasePrice = dishData.purchasePrice;

        await currentDish!.save();

        return await this.findDishById(dishID);

    }

}
