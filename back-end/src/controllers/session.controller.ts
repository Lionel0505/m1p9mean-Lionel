import {Body, JsonController, Post, QueryParam, Req, UseBefore} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { SignInRequirements } from "../utils/dto/user.dto";
import {IResponseType, ISignInResponse, ITokenData} from "../utils/api-models/global.type";
import {formatResponse, retrieveTokenData} from "../utils/utils.service";
import { SessionService } from "../services/session.service";
import {IUserRequest} from "../utils/api-models/request.type";
import {authentication} from "../middlewares/authentication.middleware";


@JsonController('/auth')
export class SessionController {

    private sessionService: SessionService = new SessionService();


    @Post('/sign_in')
    @OpenAPI({ summary: 'Create an user then return the created user.' })
    async signIn(@Body() signInData: SignInRequirements): Promise<IResponseType> {

        try {

            const responseData: ISignInResponse = await this.sessionService.signIn(signInData);

            return await formatResponse(200, 'User created', responseData);

        } catch (error: any) {

            return { status: 409, message: String(error) };

        }

    }


    @Post('/sign_out')
    @UseBefore(authentication)
    @OpenAPI({ summary: 'Create an user then return the created user.' })
    async signOut(@Req() request: IUserRequest): Promise<IResponseType> {

        try {

            const responseData: boolean = await this.sessionService.signOut(request);

            return await formatResponse(200, 'User created', responseData);

        } catch (error: any) {

            return { status: false, message: String(error) };

        }

    }


}
