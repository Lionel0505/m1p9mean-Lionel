import {ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {isEmpty} from "../utils.service";

export class OrderDto {

    constructor(shippingCost: number, status: string, deliveryMan: string, dishes: string[], customer?: string) {

        this.shippingCost = shippingCost;
        this.status = status;
        this.deliveryMan = deliveryMan;
        this.dishes = dishes;

        if (!isEmpty(customer)) this.customer = customer;

    }


    @IsNumber()
    @IsNotEmpty()
    shippingCost: number;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsOptional()
    customer?: string;

    @IsString()
    @IsNotEmpty()
    deliveryMan: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type(() => String)
    dishes: string[];

}