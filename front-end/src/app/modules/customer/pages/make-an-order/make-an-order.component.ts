import { Component, OnInit } from '@angular/core';
import { DishService } from "../../../shared/core/services/dish/dish.service";
import { SessionService } from "../../../shared/core/services/session/session.service";
import { PaginationService } from "../../../shared/core/services/pagination/pagination.service";
import { PageEvent } from "@angular/material/paginator";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { faCirclePlus, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { MatDialog } from "@angular/material/dialog";
import { OrderModalComponent } from "../../../shared/features/modals/order-modal/order-modal.component";
import { IDish } from "../../../shared/core/models/schemas/dish.schema";
import { LoaderService } from "../../../shared/core/services/loader/loader.service";
import { isEmpty } from "../../../shared/core/services/utils/utils.service";
import { OrderService } from "../../../shared/core/services/order/order.service";
import { IOrderDish } from "../../../shared/core/models/schemas/order-dish.schema";


@Component({
  selector: 'app-make-an-order',
  templateUrl: './make-an-order.component.html',
  styleUrls: ['./make-an-order.component.scss']
})
export class MakeAnOrderComponent implements OnInit {

  restaurantId: string = '';

  items: BehaviorSubject<IDish[]> = new BehaviorSubject<IDish[]>([]);

  faCirclePlus: IconDefinition = faCirclePlus;


  get checked(): boolean {

    if (!isEmpty(this.items.value) && !isEmpty(this.dishService.dishes.value)) {

      return this.dishService.dishes.value
        .filter((dish: IDish) => {
          return this.items.value
            .includes(dish);
        })
        .length > 0;

    } else {

      return false;

    }

  }


  constructor(
    public dishService: DishService,
    public orderService: OrderService,
    private sessionService: SessionService,
    public paginationService: PaginationService,
    public activatedRoute: ActivatedRoute,
    public loaderService: LoaderService,
    private dialog: MatDialog
  ) {

    this.restaurantId = activatedRoute.snapshot.params['restaurant_id'];

  }


  ngOnInit(): void {

  }


  makeAnOrder(): void {

    const dialogRef = this.dialog.open(OrderModalComponent, {
      minWidth: '50%',
      data: {
        title: 'Make an order',
        items: this.items.value.map((dish: IDish) => {
          return {dish: dish, quantity: 1};
        }),
        customer: this.sessionService.onlineUser.value?._id,
        restaurant: this.restaurantId
      }
    });

    dialogRef.beforeClosed().subscribe((result: any) => {

      this.loaderService.hydrate(true);

      if (!isEmpty(result)) {

        this.orderService.saveOrders(result.data).subscribe(() => {

          this.items.next([]);
          this.loaderService.hydrate(false);

        });

      } else {

        this.loaderService.hydrate(false);

      }

    });

  }


  chooseItem(item: IDish): void {

    const array: IDish[] = this.items.value;

    // Get the index of id in the array
    const index = array.indexOf(item);

    if (index > -1) {

      // This means id is present in the array, so remove it
      array.splice(index, 1);

    } else {

      // This means id is not present in the array, so add it
      array.push(item);

    }

    this.items.next(array);

  }


  setPage($event: PageEvent): void {

    this.dishService.dishes.next([]);

    this.paginationService.paginationData.next({
      ...this.paginationService.paginationData.value,
      page: $event.pageIndex + 1,
      limit: $event.pageSize
    });

    this.dishService.getDishes(
      {
        restaurant: this.restaurantId,
        visible: true
      },
      {
        page: $event.pageIndex + 1,
        limit: $event.pageSize,
        sort: 'name'
      }
    ).subscribe();

  }

}
