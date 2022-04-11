import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { isEmpty } from "../../../core/services/utils/utils.service";
import { NotificationService } from "../../../core/services/notification/notification.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IDish } from "../../../core/models/schemas/dish.schema";
import { E_DeliveryStatus } from "../../../core/models/global/static.enums";
import { BehaviorSubject } from "rxjs";
import { IOrderDish } from "../../../core/models/schemas/order-dish.schema";
import { faMinus, faPlus, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IOrderDto } from "../../../core/models/api/order.dto";


@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit {

  orderForm: FormGroup;

  dishes: BehaviorSubject<IOrderDish[]> = new BehaviorSubject<IOrderDish[]>([]);

  faPlus: IconDefinition = faPlus;

  faMinus: IconDefinition = faMinus;


  get cost(): number {

    if (isEmpty(this.dishes.value)) {

      return 0;

    } else {

      let result: number = this.dishes.value
        .map((item: IOrderDish) => (item.dish.purchasePrice * item.quantity))
        .reduce((previousValue: number, currentValue: number) => previousValue + currentValue);

      return result * 1.2;

    }

  }


  get shippingCost(): number {

    if (isEmpty(this.dishes.value)) {

      return 0;

    } else {

      let result: number = this.dishes.value
        .map((item: IOrderDish) => (item.dish.purchasePrice * item.quantity))
        .reduce((previousValue: number, currentValue: number) => previousValue + currentValue);

      return result * 0.2;

    }

  }


  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<OrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, customer: string, restaurant: string, items: IOrderDish[] }
  ) {

    if (isEmpty(data) || isEmpty(data.customer) || isEmpty(data.items) || isEmpty(data.title) || isEmpty(data.restaurant)) {

      this.notificationService.alert('Data not found', `Missing data.`);
      this.close();

    }

    this.dishes.next(data.items);

    this.orderForm = formBuilder.group({
      'deliveryAddress': ['', Validators.required],
      'cost': [this.cost, Validators.required],
      'shippingCost': [this.shippingCost, Validators.required],
      'customer': [data.customer, Validators.required],
      'restaurant': [data.restaurant, Validators.required],
      'status': [E_DeliveryStatus.INI, Validators.required],
    });

  }


  ngOnInit(): void {
  }


  addQuantity(value: any, item: IOrderDish): void {

    const array: IOrderDish[] = this.dishes.value;

    const index = array.indexOf(item);

    if (index > -1) {

      const newValue: number = item.quantity + Number(value);

      array[index] = {...item, quantity: newValue < 1 || newValue > 10 ? item.quantity : newValue};

      this.dishes.next(array);

    }

  }


  submit(): void {

    this.orderForm.markAllAsTouched();

    if (this.orderForm.valid) {

      const formData: IOrderDto = {...this.orderForm.value};

      Object.assign(formData,
        {
          cost: this.cost,
          shippingCost: this.shippingCost,
          dishes: this.dishes.value.map((orderDish: IOrderDish) => {
            return {...orderDish, dish: orderDish.dish._id}
          })
        });

      this.dialogRef.close({data: formData});

    }

  }


  close(): void {

    this.dialogRef.close(null);

  }

}
