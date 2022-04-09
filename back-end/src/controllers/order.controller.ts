import { Body, Get, JsonController, Post, QueryParam, Req, UseBefore } from "routing-controllers";
import { authentication } from "../middlewares/authentication.middleware";
import { OpenAPI } from "routing-controllers-openapi";
import { IResponseType } from "../utils/api-models/global.type";
import { formatResponse } from "../utils/utils.service";
import { OrderService } from "../services/order.service";
import { IUserRequest } from "../utils/api-models/request.type";
import { OrderDto } from "../utils/dto/order.dto";


@JsonController('/orders')
export class OrderController {

    private orderService: OrderService = new OrderService();


    @Post()
    @UseBefore(authentication)
    @OpenAPI({summary: 'Return (paginated/filtered) order list.'})
    async createOrder(@Req() request: IUserRequest, @Body() orderData: OrderDto): Promise<IResponseType> {

        try {

            const order = await this.orderService.saveOrder(request, orderData);

            return await formatResponse(200, 'Order created', order);

        } catch (error: any) {

            return {status: 409, message: error.message};

        }

    }


    @Get()
    @UseBefore(authentication)
    @OpenAPI({summary: 'Return (paginated/filtered) order list.'})
    async getOrders(@QueryParam('query') query: string, @QueryParam('options') options: string): Promise<IResponseType> {

        try {

            const orders = await this.orderService.findOrders(query, options);

            return await formatResponse(200, 'Orders found', orders);

        } catch (error: any) {

            return {status: 409, message: error.message};

        }

    }

}