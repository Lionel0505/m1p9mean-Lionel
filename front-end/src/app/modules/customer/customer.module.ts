import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MakeAnOrderComponent } from "./pages/make-an-order/make-an-order.component";
import { RestaurantListComponent } from './pages/restaurant-list/restaurant-list.component';
import { PublicModule } from "../public/public.module";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    MakeAnOrderComponent,
    SignUpComponent,
    RestaurantListComponent,
  ],
  imports: [
    CommonModule,
    PublicModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class CustomerModule { }
