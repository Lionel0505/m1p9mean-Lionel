import {Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, UseBefore} from "routing-controllers";
import {UserService} from "../services/user.service";
import {formatResponse} from "../utils/utils.service";
import {OpenAPI} from "routing-controllers-openapi";
import {IResponseType} from "../utils/api-models/global.type";
import {SignUpRequirements} from "../utils/dto/user.dto";
import {authentication} from "../middlewares/authentication.middleware";


@JsonController('/users')
export class UserController {

    private userService: UserService = new UserService();


    @Post()
    @UseBefore(authentication)
    @OpenAPI({summary: 'Create an user then return the created user.'})
    async createUser(@Body() userData: SignUpRequirements): Promise<IResponseType> {

        try {

            const user = await this.userService.createUser(userData);

            return await formatResponse(200, 'Sign up - success', user);

        } catch (error: any) {

            return {status: 409, message: error.message};

        }

    }


    @Put('/:user_id')
    @UseBefore(authentication)
    @OpenAPI({summary: 'Update an user then return the updated user.'})
    async updateUser(@Param('user_id') userID: string, @Body() userData: SignUpRequirements): Promise<IResponseType> {

        try {

            const user = await this.userService.updateUser(userID, userData);

            return await formatResponse(200, 'User updated', user);

        } catch (error: any) {

            console.log(error);

            return {status: 409, message: error.message};

        }

    }


    @Delete('/:user_id')
    @UseBefore(authentication)
    @OpenAPI({summary: 'Remove an user then return the removed user.'})
    async removeUser(@Param('user_id') userID: string): Promise<IResponseType> {

        try {

            const user = await this.userService.removeUser(userID);

            return await formatResponse(200, 'User removed', user);

        } catch (error: any) {

            return {status: 409, message: error.message};

        }

    }


    @Get()
    @UseBefore(authentication)
    @OpenAPI({summary: 'Return (paginated/filtered) user list.'})
    async getUsers(@QueryParam('query') query: string, @QueryParam('options') options: string): Promise<IResponseType> {

        try {

            const users = await this.userService.findUsers(query, options);

            return await formatResponse(200, 'Users found', users);

        } catch (error: any) {

            return {status: 409, message: error.message};

        }

    }


    @Get('/:user_id')
    @UseBefore(authentication)
    @OpenAPI({summary: 'Return an user using its ID'})
    async getUserById(@Param('user_id') userID: string): Promise<IResponseType> {

        try {

            const user = await this.userService.findUserById(userID);

            return await formatResponse(200, 'User found', user);

        } catch (error: any) {

            return {status: 409, message: error.message};

        }

    }

}
