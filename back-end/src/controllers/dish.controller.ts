import { Body, Get, JsonController, Param, Post, Put, QueryParam, Req, UseBefore } from "routing-controllers";
import { authentication } from "../middlewares/authentication.middleware";
import { OpenAPI } from "routing-controllers-openapi";
import { IUserRequest } from "../utils/api-models/request.type";
import { IResponseType } from "../utils/api-models/global.type";
import { formatResponse, isEmpty } from "../utils/utils.service";
import { DishService } from "../services/dish.service";
import { DishDto } from "../utils/dto/dish.dto";
import { validationMiddleware } from "../middlewares/validation.middleware";


@JsonController('/dishes')
export class DishController {

    private dishService: DishService = new DishService();


    @Post()
    @UseBefore(authentication, validationMiddleware(DishDto, 'body', true))
    @OpenAPI({summary: 'Return (paginated/filtered) order list.'})
    async createDish(@Req() request: IUserRequest, @Body() dishData: DishDto): Promise<IResponseType> {

        try {

            const dish = await this.dishService.createDish(request, dishData);

            return await formatResponse(200, 'Dish created', dish);

        } catch (error: any) {

            return {status: 409, message: error.message};

        }

    }


    @Put('/:dish_id')
    @UseBefore(authentication, validationMiddleware(DishDto, 'body', true))
    @OpenAPI({summary: 'Return (paginated/filtered) order list.'})
    async updateDish(@Param('dish_id') dishId: string, @Req() request: IUserRequest, @Body() dishData: DishDto): Promise<IResponseType> {

        try {

            const dish = await this.dishService.updateDish(dishId, dishData, request);

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

            const queryData: any = isEmpty(query) ? {} : JSON.parse(query);
            const optionsData: any = isEmpty(options) ? { pagination: false } : JSON.parse(options);

            const dishes = await this.dishService.findDishes(queryData, optionsData);

            return await formatResponse(200, 'Dishes found', dishes);

        } catch (error: any) {

            return {status: 409, message: error.message};

        }

    }

}