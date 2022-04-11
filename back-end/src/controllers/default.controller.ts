import 'dotenv/config';
import { Controller, Get } from "routing-controllers";
import { landingPage } from "../utils/html-content.storage";
import Order from '../models/order.schema';
import User from '../models/user.schema';


const baseUrl: string = process.env.BASE_URL || '';

@Controller('')
export class DefaultController {

    @Get()
    async loadLandingPage(): Promise<string> {

        return landingPage(baseUrl);

    }



    @Get('/test')
    async test(): Promise<any> {

        try {

            return Order
                .findOne()
                .populate({
                    path: 'customer',
                    model: User
                })
                .lean();

        } catch (error: any) {

            return {status: 409, message: error.message};

        }

    }




}
