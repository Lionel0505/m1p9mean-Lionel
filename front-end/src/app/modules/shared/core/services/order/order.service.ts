import apiConfig from "../../../../../../assets/api.config.json";
import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, Observable, of, switchMap } from "rxjs";
import { ApiService } from "../api/api.service";
import { NotificationService } from "../notification/notification.service";
import { baseUrl } from "../utils/utils.service";
import { IOrder } from "../../models/schemas/order.schema";
import { PaginationService } from "../pagination/pagination.service";
import { IOrderDto } from "../../models/api/order.dto";
import { IBenefitsFilter, IResponseType } from "../../models/global/global-types";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: BehaviorSubject<IOrder[]> = new BehaviorSubject<IOrder[]>([]);

  benefits: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  filterData: BehaviorSubject<IBenefitsFilter> = new BehaviorSubject<IBenefitsFilter>({limit: 10, page: 1});

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private paginationService: PaginationService
  ) {

    this.filterData
      .pipe(
        filter((val => val != null)),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((filterData) => {

          return this.apiService.get<any>(baseUrl(apiConfig.endpoints.benefits), { ...filterData });

        })
      )
      .subscribe((data: IResponseType<any>) => {

        console.log(data);

      });

  }


  getBenefits(filterData: IBenefitsFilter): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      this.apiService
        .get<any>(
          baseUrl(apiConfig.endpoints.benefits)
          , {
            params: {filter: JSON.stringify(filterData)}
          }
        )
        .subscribe((result) => {

          if (result.status != 200) {

            this.notificationService.alert('No benefits found', result.message, 'error');
            subscriber.next(false);

          } else {

            this.benefits.next(result.data.items);
            this.paginationService.setPaginationData(result.data.paginator);
            subscriber.next(true);

          }

          subscriber.complete()

        });

    });

  }


  getOrders(query: any, options: any): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      this.apiService
        .get<any>(
          baseUrl(apiConfig.endpoints.order)
          , {
            params: {query: JSON.stringify(query), options: JSON.stringify(options)}
          }
        )
        .subscribe((result) => {

          if (result.status != 200) {

            this.notificationService.alert('No order found', result.message, 'error');
            subscriber.next(false);

          } else {

            this.orders.next(result.data.items);
            this.paginationService.setPaginationData(result.data.paginator);
            subscriber.next(true);

          }

          subscriber.complete()

        });

    });

  }


  saveOrders(orderData: IOrderDto): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      this.apiService
        .post<IOrder>(
          baseUrl(apiConfig.endpoints.order)
          , {
            ...orderData
          }
        )
        .subscribe((result) => {

          if (result.status != 200) {

            this.notificationService.alert('Creation failed', result.message, 'error');
            subscriber.next(false);

          } else {

            this.notificationService.alert(
              'Creation success',
              `Your order (address: ${ result.data?.deliveryAddress }, cost: ${ result.data?.cost } ) has been initiated`,
              'success'
            );
            subscriber.next(true);

          }

          subscriber.complete()

        });

    });

  }


  updateOrder(orderId: string, orderData: IOrderDto, query: any): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      this.apiService
        .put<IOrder>(
          baseUrl(`${ apiConfig.endpoints.order }/${ orderId }`)
          , {
            ...orderData
          }
        )
        .subscribe((result) => {

          if (result.status != 200) {

            this.notificationService.alert('Update failed', result.message, 'error');
            subscriber.next(false);
            subscriber.complete();

          } else {

            this.getOrders(
              {
                ...query
              },
              {
                page: 1,
                limit: 10,
                sort: '-createdAt'
              }
            ).subscribe((status) => {

              subscriber.next(status);
              subscriber.complete()

            });

          }

        });

    });

  }

}
