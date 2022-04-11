import { IUser } from "./user.schema";
import { IDish } from "./dish.schema";
import { BaseSchema } from "./base.schema";
import { IOrderDish } from "./order-dish.schema";


export interface IOrder extends BaseSchema {

  deliveryAddress: string;

  cost: number;

  shippingCost: number;

  status: string;

  createdAt: Date;

  customer: IUser;

  deliveryMan: IUser;

  restaurant: IUser;

  dishes: IOrderDish[];

}
