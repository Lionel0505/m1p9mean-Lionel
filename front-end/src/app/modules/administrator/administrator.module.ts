import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminListComponent } from './pages/admin-list/admin-list.component';
import { DeliveryManListComponent } from './pages/delivery-man-list/delivery-man-list.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { SharedModule } from "../shared/shared.module";
import { AdminOrderListComponent } from './pages/admin-order-list/admin-order-list.component';
import { AdminRestaurantsComponent } from './pages/admin-restaurants/admin-restaurants.component';
import { BenefitsComponent } from './pages/benefits/benefits.component';


@NgModule({
  declarations: [
    AdminListComponent,
    DeliveryManListComponent,
    CustomerListComponent,
    AdminOrderListComponent,
    AdminRestaurantsComponent,
    BenefitsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdministratorModule {
}
