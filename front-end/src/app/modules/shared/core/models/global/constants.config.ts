import {
  faBasketShopping,
  faDolly,
  faList,
  faMoneyBillTrendUp,
  faTruckFast,
  faUsersGear,
  faUserShield,
  faUtensils,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";


export interface RouteInfo {

  path: string;

  title: string;

  class: string;

  icon: IconDefinition;

}


export const CUSTOMER_ROUTES: RouteInfo[] = [
  {
    path: 'customer/restaurants',
    title: 'Make an order',
    class: '',
    icon: faBasketShopping
  }
];

export const DELIVERY_ROUTES: RouteInfo[] = [
  {
    path: 'delivery',
    title: 'Deliveries',
    class: '',
    icon: faTruckFast
  }
];

export const ADMIN_ROUTES: RouteInfo[] = [
  {
    path: 'admin/orders',
    title: 'Orders',
    class: '',
    icon: faList
  },
  {
    path: 'admin/administrators',
    title: 'Managers',
    class: '',
    icon: faUserShield
  },
  {
    path: 'admin/delivery-men',
    title: 'Delivery men',
    class: '',
    icon: faDolly
  },
  {
    path: 'admin/customers',
    title: 'Customers',
    class: '',
    icon: faUsersGear
  },
  {
    path: 'admin/restaurants',
    title: 'Restaurants',
    class: '',
    icon: faUtensils
  },
  {
    path: 'admin/benefits',
    title: 'Benefits',
    class: '',
    icon: faMoneyBillTrendUp
  }
];

export const RESTAURANT_ROUTES: RouteInfo[] = [
  {
    path: 'restaurant/orders',
    title: 'Orders',
    class: '',
    icon: faList
  },
  {
    path: 'restaurant/dishes',
    title: 'Dishes',
    class: '',
    icon: faUtensils
  },
  {
    path: 'restaurant/benefits',
    title: 'Benefits',
    class: '',
    icon: faMoneyBillTrendUp
  }
];
