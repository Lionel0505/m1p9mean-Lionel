import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { isEmpty } from "../utils.service";


export class DishDto {


    constructor(name: string, purchasePrice: number, costPrice: number, salePrice: number, visible: boolean, restaurant: string, picture?: string) {

        this.name = name;
        this.purchasePrice = purchasePrice;
        this.costPrice = costPrice;
        this.salePrice = salePrice;
        this.visible = visible;
        this.restaurant = restaurant;

        if (isEmpty(picture)) this.picture = picture;

    }


    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    picture?: string;

    @IsNumber()
    @IsNotEmpty()
    purchasePrice: number;

    @IsNumber()
    @IsNotEmpty()
    costPrice: number;

    @IsNumber()
    @IsNotEmpty()
    salePrice: number;

    @IsBoolean()
    @IsNotEmpty()
    visible: boolean;

    @IsString()
    @IsNotEmpty()
    restaurant: string;

}