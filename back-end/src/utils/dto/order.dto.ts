import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { isEmpty } from "../utils.service";


export class OrderDto {

    constructor(cost: number, shippingCost: number, status: string, restaurant: string, dishes: { dish: string, quantity: number }[], customer: string, deliveryAddress: string, deliveryMan?: string) {

        this.cost = cost;
        this.shippingCost = shippingCost;
        this.status = status;
        this.restaurant = restaurant;
        this.dishes = dishes;
        this.customer = customer;
        this.deliveryAddress = deliveryAddress;

        if (!isEmpty(deliveryMan)) this.deliveryMan = deliveryMan;


    }


    @IsNumber()
    @IsNotEmpty()
    cost: number;

    @IsNumber()
    @IsNotEmpty()
    shippingCost: number;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    deliveryAddress: string;

    @IsString()
    @IsNotEmpty()
    customer: string;

    @IsString()
    @IsOptional()
    deliveryMan?: string;

    @IsString()
    @IsNotEmpty()
    restaurant: string;

    @IsArray()
    @ArrayMinSize(1)
    dishes: { dish: string, quantity: number }[];

}