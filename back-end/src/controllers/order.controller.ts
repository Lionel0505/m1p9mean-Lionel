import { Body, Get, JsonController, Param, Post, Put, QueryParam, Req, UseBefore } from "routing-controllers";
import { authentication } from "../middlewares/authentication.middleware";
import { OpenAPI } from "routing-controllers-openapi";
import { IResponseType } from "../utils/api-models/global.type";
import { formatResponse, isEmpty } from "../utils/utils.service";
import { OrderService } from "../services/order.service";
import { IUserRequest } from "../utils/api-models/request.type";
import { OrderDto } from "../utils/dto/order.dto";
import { validationMiddleware } from "../middlewares/validation.middleware";


@JsonController('/orders')
export class OrderController {

    private orderService: OrderService = new OrderService();


    @Post()
    @UseBefore(authentication, validationMiddleware(OrderDto, 'body', true))
    @OpenAPI({summary: 'Return created order.'})
    async createOrder(@Req() request: IUserRequest, @Body() orderData: OrderDto): Promise<IResponseType> {

        try {

            const order = await this.orderService.saveOrder(request, orderData);

            return await formatResponse(200, 'Order created', order);

        } catch (error: any) {

            console.log(error);
            return {status: 409, message: error.message};

        }

    }


    @Put('/:order_id')
    @UseBefore(authentication, validationMiddleware(OrderDto, 'body', true))
    @OpenAPI({summary: 'Return created order.'})
    async updateOrder(@Param('order_id') orderId: string, @Body() orderData: OrderDto): Promise<IResponseType> {

        try {

            const order = await this.orderService.updateOrder(orderId, orderData);

            return await formatResponse(200, 'Order updated', order);

        } catch (error: any) {

            console.log(error);

            return {status: 409, message: error.message};

        }

    }


    @Get()
    @UseBefore(authentication)
    @OpenAPI({summary: 'Return (paginated/filtered) order list.'})
    async getOrders(@QueryParam('query') query: string, @QueryParam('options') options: string): Promise<IResponseType> {

        try {

            const queryData: any = isEmpty(query) ? {} : JSON.parse(query);
            const optionsData: any = isEmpty(options) ? { pagination: false } : JSON.parse(options);

            const orders = await this.orderService.findOrders(queryData, optionsData);

            return await formatResponse(200, 'Orders found', orders);

        } catch (error: any) {

            return {status: 409, message: error.message};

        }

    }


    @Get('/benefits')
    @UseBefore(authentication)
    @OpenAPI({summary: 'Return (paginated/filtered) order list.'})
    async getBenefits(@QueryParam('filter') filter: string): Promise<IResponseType> {

        try {

            const filterData: any = isEmpty(filter) ? { page: 1, limit: 10 } : JSON.parse(filter);

            const benefits = await this.orderService.findBenefits(filterData);

            return await formatResponse(200, 'Orders found', benefits);

        } catch (error: any) {

            console.log(error);
            return {status: 409, message: error.message};

        }

    }

}