import { Component, Input, OnInit } from '@angular/core';
import { isEmpty } from "../../../core/services/utils/utils.service";
import { E_UserType } from "../../../core/models/global/static.enums";
import { PaginationService } from "../../../core/services/pagination/pagination.service";
import { LoaderService } from "../../../core/services/loader/loader.service";
import { PageEvent } from "@angular/material/paginator";
import { SessionService } from "../../../core/services/session/session.service";
import { OrderService } from "../../../core/services/order/order.service";
import { UserService } from "../../../core/services/user/user.service";
import { BehaviorSubject } from "rxjs";
import { MatDateRangePickerInput } from "@angular/material/datepicker/date-range-picker";


@Component({
  selector: 'app-benefits-table',
  templateUrl: './benefits-table.component.html',
  styleUrls: ['./benefits-table.component.scss']
})
export class BenefitsTableComponent implements OnInit {

  @Input('title') title: string = '';

  dateStart: BehaviorSubject<string> = new BehaviorSubject<string>('');

  dateEnd: BehaviorSubject<string> = new BehaviorSubject<string>('');


  get isRestaurant(): boolean {

    if (isEmpty(this.sessionService.onlineUser.value)) {

      return false;

    } else {

      return this.sessionService.onlineUser.value?.type == E_UserType.RES;

    }

  }


  constructor(
    public orderService: OrderService,
    public userService: UserService,
    public sessionService: SessionService,
    public paginationService: PaginationService,
    public loaderService: LoaderService
  ) {
  }


  ngOnInit(): void {
  }


  onRestaurantSelected($event: any): void {

    if (!isEmpty($event.value)) {

      this.orderService.filterData.next(
        {
          ...this.orderService.filterData.value, restaurant: $event.value
        }
      );

    } else {

      this.orderService.filterData.next(
        {
          ...this.orderService.filterData.value, restaurant: undefined
        }
      );

    }

  }


  onDateSelected(): void {

    if (!isEmpty(this.dateStart.value) && !isEmpty(this.dateEnd.value)) {

      this.orderService.filterData.next(
        {
          ...this.orderService.filterData.value, dateRange: {
            date1: this.dateStart.value,
            date2: this.dateEnd.value,
          }
        }
      );

    }

  }


  onDateStartChange($event: any, start: boolean): void {

    const date: Date = new Date($event.value);
    const dateString: string = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    ].join('-');

    if (start) this.dateStart.next(dateString);
    else this.dateEnd.next(dateString);

  }



  setPage($event: PageEvent): void {

    this.loaderService.hydrate(true);

    this.orderService.benefits.next([]);

    this.paginationService.paginationData.next({
      ...this.paginationService.paginationData.value,
      page: $event.pageIndex + 1,
      limit: $event.pageSize
    });

    this.orderService.getBenefits(
      {
        ...this.orderService.filterData.value, page: $event.pageIndex + 1, limit: $event.pageSize
      }
    ).subscribe(() => {

      this.loaderService.hydrate(false);

    });

  }

}
