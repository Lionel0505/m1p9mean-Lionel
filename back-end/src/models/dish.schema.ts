import mongoose, { PaginateModel } from "mongoose";
import { IUser } from "./user.schema";
import paginate from "mongoose-paginate-v2";


export interface IDish extends mongoose.Document {

    name: string;

    picture: string;

    // prix d'achat
    purchasePrice: number;

    // prix de revient
    costPrice: number;

    // prix de vente
    salePrice: number;

    visible: boolean;

    restaurant: IUser;

}


const DishSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        picture: {
            type: String
        },
        // prix d'achat
        purchasePrice: {
            type: Number,
            required: true,
            validate: {
                validator: (value: number) => value > 0,
                message: (props: any) => `${props.value} is not a valid purchase price.`
            }
        },
        // prix de revient
        costPrice: {
            type: Number,
            required: true,
            validate: {
                validator: (value: number) => value > 0,
                message: (props: any) => `${props.value} is not a valid cost price.`
            }
        },
        // prix de vente
        salePrice: {
            type: Number,
            required: true,
            validate: {
                validator: (value: number) => value > 0,
                message: (props: any) => `${props.value} is not a valid sale price.`
            }
        },
        visible: {
            type: Boolean,
            required: true,
            default: true
        },
        restaurant: {
            type: String,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
        _id: false
    }
);


// Add paginate plugin
DishSchema.plugin(paginate);


export default mongoose.model<IDish, PaginateModel<IDish>>('Dish', DishSchema);
