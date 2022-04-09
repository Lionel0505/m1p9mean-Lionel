import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { isEmpty } from "../utils.service";


export class DishDto {


    constructor(name: string, purchasePrice: number, costPrice: number, salePrice: number, visible: boolean, picture: string, restaurant: string) {

        this.name = name;
        this.purchasePrice = purchasePrice;
        this.costPrice = costPrice;
        this.salePrice = salePrice;
        this.visible = visible;

        if (isEmpty(picture)) this.picture = picture;

        if (isEmpty(restaurant)) this.restaurant = restaurant;

    }


    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    picture?: string;

    @IsString()
    @IsNotEmpty()
    purchasePrice: number;

    @IsString()
    @IsNotEmpty()
    costPrice: number;

    @IsString()
    @IsNotEmpty()
    salePrice: number;

    @IsString()
    @IsNotEmpty()
    visible: boolean;

    @IsString()
    @IsOptional()
    restaurant?: string;

}