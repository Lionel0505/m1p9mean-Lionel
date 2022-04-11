import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./core/interceptors/token/token.interceptor";
import { PaginatorComponent } from './features/others/paginator/paginator.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { UsersTableComponent } from './features/tables/users-table/users-table.component';
import { OrdersTableComponent } from './features/tables/orders-table/orders-table.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { UserModalComponent } from './features/modals/user-modal/user-modal.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { DishesTableComponent } from './features/tables/dishes-table/dishes-table.component';
import { DishModalComponent } from './features/modals/dish-modal/dish-modal.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { OrderModalComponent } from './features/modals/order-modal/order-modal.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { OrderDeliveryModalComponent } from './features/modals/order-delivery-modal/order-delivery-modal.component';
import { BenefitsTableComponent } from './features/tables/benefits-table/benefits-table.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";


@NgModule({
  declarations: [
    PaginatorComponent,
    UsersTableComponent,
    OrdersTableComponent,
    UserModalComponent,
    DishesTableComponent,
    DishModalComponent,
    OrderModalComponent,
    OrderDeliveryModalComponent,
    BenefitsTableComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    FontAwesomeModule,
    MatDialogModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    DragDropModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  exports: [
    PaginatorComponent,
    UsersTableComponent,
    OrdersTableComponent,
    DishesTableComponent,
    BenefitsTableComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
