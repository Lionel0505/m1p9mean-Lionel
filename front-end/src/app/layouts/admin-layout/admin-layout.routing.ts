import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "../../modules/public/pages/page-not-found/page-not-found.component";
import { RestaurantListComponent } from "../../modules/customer/pages/restaurant-list/restaurant-list.component";
import { MakeAnOrderComponent } from "../../modules/customer/pages/make-an-order/make-an-order.component";
import { UserResolver } from "../../modules/shared/core/resolvers/user/user.resolver";
import { AdminListComponent } from "../../modules/administrator/pages/admin-list/admin-list.component";
import {
  DeliveryManListComponent
} from "../../modules/administrator/pages/delivery-man-list/delivery-man-list.component";
import { CustomerListComponent } from "../../modules/administrator/pages/customer-list/customer-list.component";
import { OrderResolver } from "../../modules/shared/core/resolvers/order/order.resolver";
import { AdminOrderListComponent } from "../../modules/administrator/pages/admin-order-list/admin-order-list.component";
import {
  AdminRestaurantsComponent
} from "../../modules/administrator/pages/admin-restaurants/admin-restaurants.component";
import { DishResolver } from "../../modules/shared/core/resolvers/dish/dish.resolver";
import {
  RestaurantDishesComponent
} from "../../modules/restaurant/pages/restaurant-dishes/restaurant-dishes.component";
import {
  RestaurantOrdersComponent
} from "../../modules/restaurant/pages/restaurant-orders/restaurant-orders.component";
import { RedirectGuard } from "../../modules/shared/core/guards/redirect/redirect.guard";
import { MakeAnOrderResolver } from "../../modules/customer/core/resolvers/make-an-order/make-an-order.resolver";
import { DeliveriesComponent } from "../../modules/delivery-man/pages/deliveries/deliveries.component";
import { BlankPageComponent } from "../../modules/public/pages/blank-page/blank-page.component";
import { BenefitsResolver } from "../../modules/shared/core/resolvers/benefits/benefits.resolver";
import { BenefitsComponent } from "../../modules/administrator/pages/benefits/benefits.component";


const routes: Routes = [
  {
    path: 'customer',
    children: [
      {
        path: '',
        redirectTo: 'restaurants',
        pathMatch: 'full'
      },
      {
        path: 'restaurants',
        resolve: {data: UserResolver},
        component: RestaurantListComponent
      },
      {
        path: 'restaurants/:restaurant_id/make-an-order',
        resolve: {data: MakeAnOrderResolver},
        component: MakeAnOrderComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: 'restaurant',
    canActivateChild: [RedirectGuard],
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        resolve: {data: OrderResolver},
        component: RestaurantOrdersComponent
      },
      {
        path: 'dishes',
        resolve: {data: DishResolver},
        component: RestaurantDishesComponent
      },
      {
        path: 'benefits',
        component: MakeAnOrderComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: 'admin',
    canActivateChild: [RedirectGuard],
    children: [
      {
        path: '',
        redirectTo: 'administrators',
        pathMatch: 'full'
      },
      {
        path: 'administrators',
        resolve: {data: UserResolver},
        component: AdminListComponent
      },
      {
        path: 'delivery-men',
        resolve: {data: UserResolver},
        component: DeliveryManListComponent
      },
      {
        path: 'customers',
        resolve: {data: UserResolver},
        component: CustomerListComponent
      },
      {
        path: 'restaurants',
        resolve: {data: UserResolver},
        component: AdminRestaurantsComponent
      },
      {
        path: 'orders',
        resolve: {data: OrderResolver},
        component: AdminOrderListComponent
      },
      {
        path: 'benefits',
        resolve: {data: BenefitsResolver},
        component: BenefitsComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: 'delivery',
    resolve: { data: OrderResolver },
    component: DeliveriesComponent
  },
  {
    path: '404-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    component: BlankPageComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRouting {
}
