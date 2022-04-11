import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRouting } from './app.routing';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ComponentsModule } from "./components/components.module";
import { PublicModule } from "./modules/public/public.module";
import { AdminLayoutModule } from "./layouts/admin-layout/admin-layout.module";
import { DeliveryManModule } from "./modules/delivery-man/delivery-man.module";
import { AdministratorModule } from "./modules/administrator/administrator.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "./modules/shared/shared.module";
import { CustomerModule } from "./modules/customer/customer.module";
import { RestaurantModule } from "./modules/restaurant/restaurant.module";
import { MatNativeDateModule } from "@angular/material/core";


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    FontAwesomeModule,
    PublicModule,
    AdminLayoutModule,
    DeliveryManModule,
    SharedModule,
    CustomerModule,
    AdministratorModule,
    RestaurantModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
