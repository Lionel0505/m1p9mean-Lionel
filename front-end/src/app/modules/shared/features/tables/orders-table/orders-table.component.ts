import { Component, Input, OnInit } from '@angular/core';
import { PaginationService } from "../../../core/services/pagination/pagination.service";
import { PageEvent } from "@angular/material/paginator";
import { OrderService } from "../../../core/services/order/order.service";
import { faBan, faCircleCheck, faPenToSquare, faTruckRampBox, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IOrder } from "../../../core/models/schemas/order.schema";
import { isEmpty } from "../../../core/services/utils/utils.service";
import { E_DeliveryStatus, E_UserType } from "../../../core/models/global/static.enums";
import { IOrderDto } from "../../../core/models/api/order.dto";
import { LoaderService } from "../../../core/services/loader/loader.service";
import { MatDialog } from "@angular/material/dialog";
import { OrderDeliveryModalComponent } from "../../modals/order-delivery-modal/order-delivery-modal.component";
import { UserService } from "../../../core/services/user/user.service";
import { IOrderDish } from "../../../core/models/schemas/order-dish.schema";


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {

  @Input('title') title: string = '';

  @Input('query') query: any = {};

  @Input('userType') userType: string = '';

  deliveryStatus = E_DeliveryStatus;

  faCircleCheck: IconDefinition = faCircleCheck;

  faBan: IconDefinition = faBan;

  faTruckRampBox: IconDefinition = faTruckRampBox;

  faPenToSquare: IconDefinition = faPenToSquare;


  get isRestaurant(): boolean {

    if (isEmpty(this.userType)) {

      return false;

    } else {

      return this.userType == E_UserType.RES;

    }

  }


  get isAdmin(): boolean {

    if (isEmpty(this.userType)) {

      return false;

    } else {

      return this.userType == E_UserType.ADM;

    }

  }


  get isCustomer(): boolean {

    if (isEmpty(this.userType)) {

      return false;

    } else {

      return this.userType == E_UserType.CUS;

    }

  }

  constructor(
    public orderService: OrderService,
    public userService: UserService,
    public loaderService: LoaderService,
    public paginationService: PaginationService,
    private dialog: MatDialog
  ) {
  }


  ngOnInit(): void {
  }


  updateOrderStatus(order: IOrder, status: string): void {

    this.loaderService.hydrate(true);

    const orderData: IOrderDto = {
      cost: order.cost,
      customer: order.customer._id,
      deliveryAddress: order.deliveryAddress,
      dishes: order.dishes.map((orderDish: IOrderDish) => {
        return {...orderDish, dish: orderDish.dish._id}
      }),
      restaurant: order.restaurant._id,
      shippingCost: order.shippingCost,
      status: status
    };

    if (!isEmpty(order.deliveryMan))
      Object.assign(orderData, {
        deliveryMan: order.deliveryMan._id
      });

    this.orderService.updateOrder(order._id,  orderData, this.query).subscribe(() => {

      this.loaderService.hydrate(false);

    });

  }


  updateOrder(order: IOrder): void {

    this.loaderService.hydrate(true);

    this.userService.getAvailableDeliveryMen().subscribe(() => {

      this.loaderService.hydrate(false);

    });

    const dialogRef = this.dialog.open(OrderDeliveryModalComponent, {
      minWidth: '40%',
      data: { title: 'Choose delivery man', order: order }
    });

    dialogRef.beforeClosed().subscribe((result) => {

      this.loaderService.hydrate(true);

      if (!isEmpty(result)) {

        this.orderService.updateOrder(result.orderId, result.data, this.query).subscribe(() => {

          this.loaderService.hydrate(false);

        });

      } else {

        this.loaderService.hydrate(false);

      }

    });

  }


  setPage($event: PageEvent): void {

    this.loaderService.hydrate(true);

    this.orderService.orders.next([]);

    this.paginationService.paginationData.next({
      ...this.paginationService.paginationData.value,
      page: $event.pageIndex + 1,
      limit: $event.pageSize
    });

    this.orderService.getOrders(
      {
        ...this.query
      },
      {
        page: $event.pageIndex + 1,
        limit: $event.pageSize,
        sort: '-createdAt'
      }
    ).subscribe(() => {

      this.loaderService.hydrate(false);

    });

  }

}
