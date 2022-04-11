import { Component, OnInit } from '@angular/core';
import { faCircleCheck, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { OrderService } from "../../../../shared/core/services/order/order.service";
import { LoaderService } from "../../../../shared/core/services/loader/loader.service";
import { PaginationService } from "../../../../shared/core/services/pagination/pagination.service";
import { IOrder } from "../../../../shared/core/models/schemas/order.schema";
import { IOrderDto } from "../../../../shared/core/models/api/order.dto";
import { IDish } from "../../../../shared/core/models/schemas/dish.schema";
import { PageEvent } from "@angular/material/paginator";
import { E_DeliveryStatus } from "../../../../shared/core/models/global/static.enums";
import { SessionService } from "../../../../shared/core/services/session/session.service";
import { isEmpty } from "../../../../shared/core/services/utils/utils.service";
import { IOrderDish } from "../../../../shared/core/models/schemas/order-dish.schema";


@Component({
  selector: 'app-deliveries-table',
  templateUrl: './deliveries-table.component.html',
  styleUrls: ['./deliveries-table.component.scss']
})
export class DeliveriesTableComponent implements OnInit {

  deliveryStatus = E_DeliveryStatus;

  faCircleCheck: IconDefinition = faCircleCheck;


  get query(): any {

    if (isEmpty(this.sessionService.onlineUser.value)) {

      return {_id: 'N/A'};

    } else {

      return {
        status: E_DeliveryStatus.TOD,
        deliveryMan: this.sessionService.onlineUser.value?._id
      };

    }

  }


  constructor(
    public orderService: OrderService,
    public sessionService: SessionService,
    public loaderService: LoaderService,
    public paginationService: PaginationService
  ) {
  }


  ngOnInit(): void {
  }


  deliverOrder(order: IOrder): void {

    this.loaderService.hydrate(true);

    const orderData: IOrderDto = {
      cost: order.cost,
      customer: order.customer._id,
      deliveryAddress: order.deliveryAddress,
      deliveryMan: order.deliveryMan._id,
      dishes: order.dishes.map((orderDish: IOrderDish) => {
        return {...orderDish, dish: orderDish.dish._id};
      }),
      restaurant: order.restaurant._id,
      shippingCost: order.shippingCost,
      status: E_DeliveryStatus.DEL
    };

    this.orderService.updateOrder(order._id, orderData, this.query).subscribe(() => {

      this.loaderService.hydrate(false);

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
