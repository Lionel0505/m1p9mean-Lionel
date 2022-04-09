import mongoose, {PaginateModel} from "mongoose";
import { E_DeliveryStatus } from "../utils/static.enums";
import { IUser } from "./user.schema";
import { IDish } from "./dish.schema";
import paginate from "mongoose-paginate-v2";


export interface IOrder extends mongoose.Document {

    shippingCost: number;

    status: E_DeliveryStatus;

    createdAt: Date;

    customer: IUser;

    deliveryMan: IUser;

    dishes: [IDish];

}


const OrderSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        shippingCost: {
            type: Number,
            required: true,
            validate: {
                validator: (value: number) => value > 0,
                message: (props: any) => `${props.value} is not a valid shipping cost.`
            }
        },
        status: {
            type: String,
            enum: E_DeliveryStatus,
            default: E_DeliveryStatus.INI
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            immutable: true
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        deliveryMan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }]
    },
    {
        timestamps: true,
        _id: false
    }
);


// Add paginate plugin
OrderSchema.plugin(paginate);


export default mongoose.model<IOrder, PaginateModel<IOrder>>('Order', OrderSchema);
