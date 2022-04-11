import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantDishesComponent } from './pages/restaurant-dishes/restaurant-dishes.component';
import { RestaurantOrdersComponent } from './pages/restaurant-orders/restaurant-orders.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    RestaurantDishesComponent,
    RestaurantOrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RestaurantModule {
}
