
export interface IOrderDto {

    cost: number;

    shippingCost: number;

    status: string;

    deliveryAddress: string;

    customer: string;

    deliveryMan?: string;

    restaurant: string;

    dishes: { dish: string, quantity: number }[];

}
