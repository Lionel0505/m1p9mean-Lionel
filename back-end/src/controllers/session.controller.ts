import { Body, Get, JsonController, Post, Req, UseBefore } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { SignInRequirements, SignUpRequirements } from "../utils/dto/user.dto";
import { IResponseType, ISignInResponse } from "../utils/api-models/global.type";
import { formatResponse } from "../utils/utils.service";
import { SessionService } from "../services/session.service";
import { IUserRequest } from "../utils/api-models/request.type";
import { authentication } from "../middlewares/authentication.middleware";
import { UserService } from "../services/user.service";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { DishDto } from "../utils/dto/dish.dto";


@JsonController('/auth')
export class SessionController {

    private sessionService: SessionService = new SessionService();

    private userService: UserService = new UserService();


    @Post('/sign_up')
    @UseBefore(validationMiddleware(SignUpRequirements, 'body', true))
    @OpenAPI({summary: 'Create an user then return the created user.'})
    async createUser(@Body() userData: SignUpRequirements): Promise<IResponseType> {

        try {

            const user = await this.userService.createUser(userData);

            const tokenData: ISignInResponse = await this.sessionService.signIn({
                emailAddress: user.emailAddress,
                password: userData.password
            });

            return await formatResponse(200, 'Sign up - success', tokenData);

        } catch (error: any) {

            return {status: 409, message: error.message};

        }

    }


    @Post('/sign_in')
    @UseBefore(validationMiddleware(SignInRequirements, 'body', true))
    @OpenAPI({summary: 'Return token and user type for url management.'})
    async signIn(@Body() signInData: SignInRequirements): Promise<IResponseType> {

        try {

            const responseData: ISignInResponse = await this.sessionService.signIn(signInData);

            return await formatResponse(200, 'User created', responseData);

        } catch (error: any) {

            return {status: 409, message: String(error)};

        }

    }


    @Get('/logged_in_user')
    @UseBefore(authentication)
    @OpenAPI({summary: 'Return logged in user'})
    async getLoggedInUser(@Req() request: IUserRequest): Promise<IResponseType> {

        try {

            return await formatResponse(200, 'User created', request.user);

        } catch (error: any) {

            return {status: 409, message: String(error)};

        }

    }

}
