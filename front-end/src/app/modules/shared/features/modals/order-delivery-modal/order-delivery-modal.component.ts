import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { isEmpty } from "../../../core/services/utils/utils.service";
import { IDish } from "../../../core/models/schemas/dish.schema";
import { NotificationService } from "../../../core/services/notification/notification.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../../../core/services/user/user.service";
import { IOrderDish } from "../../../core/models/schemas/order-dish.schema";
import { IOrderDto } from "../../../core/models/api/order.dto";
import { IOrder } from "../../../core/models/schemas/order.schema";


@Component({
  selector: 'app-order-delivery-modal',
  templateUrl: './order-delivery-modal.component.html',
  styleUrls: ['./order-delivery-modal.component.scss']
})
export class OrderDeliveryModalComponent implements OnInit {

  orderForm: FormGroup;


  get cost(): number {

    if (isEmpty(this.data.order.dishes)) {

      return 0;

    } else {

      let result: number = this.data.order.dishes
        .map((item: IOrderDish) => ((item.dish as IDish).purchasePrice * item.quantity))
        .reduce((previousValue: number, currentValue: number) => previousValue + currentValue);

      return result * 1.2;

    }

  }


  get shippingCost(): number {

    if (isEmpty(this.data.order.dishes)) {

      return 0;

    } else {

      let result: number = this.data.order.dishes
        .map((item: IOrderDish) => ((item.dish as IDish).purchasePrice * item.quantity))
        .reduce((previousValue: number, currentValue: number) => previousValue + currentValue);

      return result * 0.2;

    }

  }


  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    public userService: UserService,
    private dialogRef: MatDialogRef<OrderDeliveryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, order: IOrder }
  ) {

    if (isEmpty(data) || isEmpty(data.order) || isEmpty(data.title)) {

      this.notificationService.alert('Data not found', `Missing data.`);
      this.close();

    }

    this.orderForm = formBuilder.group({
      'deliveryAddress': [data.order.deliveryAddress, Validators.required],
      'deliveryMan': ['', Validators.required],
      'cost': [data.order.cost, Validators.required],
      'shippingCost': [data.order.shippingCost, Validators.required],
      'customer': [data.order.customer._id, Validators.required],
      'restaurant': [data.order.restaurant._id, Validators.required],
      'status': [data.order.status, Validators.required],
    });

  }


  ngOnInit(): void {
  }


  submit(): void {

    this.orderForm.markAllAsTouched();

    if (this.orderForm.valid) {

      const formData: IOrderDto = {...this.orderForm.value};

      Object.assign(formData, {
        dishes: this.data.order.dishes.map((orderDish: IOrderDish) => {
          return {dish: orderDish.dish._id, quantity: orderDish.quantity}
        })
      });

      this.dialogRef.close({orderId: this.data.order._id, data: formData});

    }

  }


  close(): void {

    this.dialogRef.close(null);

  }

}
