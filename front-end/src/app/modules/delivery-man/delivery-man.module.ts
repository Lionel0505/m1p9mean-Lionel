import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveriesComponent } from './pages/deliveries/deliveries.component';
import { DeliveriesTableComponent } from './features/tables/deliveries-table/deliveries-table.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared/shared.module";



@NgModule({
    declarations: [
        DeliveriesComponent,
        DeliveriesTableComponent,
        DeliveriesTableComponent
    ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class DeliveryManModule { }
