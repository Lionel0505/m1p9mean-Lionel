import { Body, Get, JsonController, Post, QueryParam, Req, UseBefore } from "routing-controllers";
import { authentication } from "../middlewares/authentication.middleware";
import { OpenAPI } from "routing-controllers-openapi";
import { IUserRequest } from "../utils/api-models/request.type";
import { IResponseType } from "../utils/api-models/global.type";
import { formatResponse } from "../utils/utils.service";
import { DishService } from "../services/dish.service";
import { DishDto } from "../utils/dto/dish.dto";


@JsonController('/dishes')
export class DishController {

    private dishService: DishService = new DishService();


    @Post()
    @UseBefore(authentication)
    @OpenAPI({summary: 'Return (paginated/filtered) order list.'})
    async createDish(@Req() request: IUserRequest, @Body() dishData: DishDto): Promise<IResponseType> {

        try {

            const dish = await this.dishService.createDish(request, dishData);

            return await formatResponse(200, 'Dish created', dish);

        } catch (error: any) {

            return {status: 409, message: error.message};

        }

    }


    @Get()
    @UseBefore(authentication)
    @OpenAPI({summary: 'Return (paginated/filtered) order list.'})
    async getDishes(@QueryParam('query') query: string, @QueryParam('options') options: string): Promise<IResponseType> {

        try {

            const orders = await this.dishService.findDishes(query, options);

            return await formatResponse(200, 'Orders found', orders);

        } catch (error: any) {

            return {status: 409, message: error.message};

        }

    }

}