import mongoose, { PaginateModel } from "mongoose";
import { E_DeliveryStatus } from "../utils/static.enums";
import { IUser } from "./user.schema";
import { IDish } from "./dish.schema";
import paginate from "mongoose-paginate-v2";


export interface IOrder extends mongoose.Document {

    deliveryAddress: string;

    cost: number;

    shippingCost: number;

    status: E_DeliveryStatus;

    createdAt: Date | string;

    customer: IUser;

    deliveryMan: IUser | string;

    restaurant: IUser;

    dishes: { dish: IDish | string, quantity: number }[];

}


const OrderSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        deliveryAddress: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true,
            validate: {
                validator: (value: number) => value > 0,
                message: (props: any) => `${ props.value } is not a valid order cost.`
            }
        },
        shippingCost: {
            type: Number,
            required: true,
            validate: {
                validator: (value: number) => value > 0,
                message: (props: any) => `${ props.value } is not a valid shipping cost.`
            }
        },
        status: {
            type: String,
            enum: E_DeliveryStatus,
            default: E_DeliveryStatus.INI,
            required: true
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            immutable: true
        },
        customer: {
            type: String,
            ref: 'User',
            required: true
        },
        deliveryMan: {
            type: String,
            ref: 'User'
        },
        restaurant: {
            type: String,
            ref: 'User',
            required: true
        },
        dishes: [
            {
                dish: {
                    type: String,
                    ref: 'Dish',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                    validate: {
                        validator: (value: number) => value >= 1,
                        message: (props: any) => `${ props.value } is not a valid quantity for menu items.`
                    }
                }
            }
        ]
    },
    {
        timestamps: true,
        _id: false
    }
);


// Add paginate plugin
OrderSchema.plugin(paginate);


export default mongoose.model<IOrder, PaginateModel<IOrder>>('Order', OrderSchema);
