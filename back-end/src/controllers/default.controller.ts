import 'dotenv/config';
import { Controller, Get } from "routing-controllers";
import { landingPage } from "../utils/html-content.storage";


const baseUrl: string = process.env.BASE_URL || '';

@Controller('/')
export class DefaultController {

    @Get()
    async loadLandingPage(): Promise<string> {

        return landingPage(baseUrl);

    }

}
