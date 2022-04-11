import apiConfig from "../../../../../../assets/api.config.json";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { ApiService } from "../api/api.service";
import { NotificationService } from "../notification/notification.service";
import { baseUrl } from "../utils/utils.service";
import { IDishDto } from "../../models/api/dish.dto";
import { IDish } from "../../models/schemas/dish.schema";
import { PaginationService } from "../pagination/pagination.service";


@Injectable({
  providedIn: 'root'
})
export class DishService {

  dishes: BehaviorSubject<IDish[]> = new BehaviorSubject<IDish[]>([]);


  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private paginationService: PaginationService
  ) {
  }


  getDishes(query: any, options: any): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      this.apiService
        .get<any>(
          baseUrl(apiConfig.endpoints.dish)
          , {
            params: {query: JSON.stringify(query), options: JSON.stringify(options)}
          }
        )
        .subscribe((result) => {

          if (result.status != 200) {

            this.notificationService.alert('No data found', result.message, 'error');
            subscriber.next(false);

          } else {

            this.dishes.next(result.data.items);
            this.paginationService.setPaginationData(result.data.paginator);
            subscriber.next(true);

          }

          subscriber.complete()

        });

    });

  }


  createDish(dishData: IDishDto): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      this.apiService
        .post<IDish>(
          baseUrl(apiConfig.endpoints.dish)
          , {
            ...dishData
          }
        )
        .subscribe((result) => {

          if (result.status != 200) {

            this.notificationService.alert('Creation failed!', result.message, 'error');
            subscriber.next(false);
            subscriber.complete()

          } else {

            this.getDishes(
              {
                restaurant: result.data?.restaurant
              },
              {
                page: 1,
                limit: 10,
                sort: '-createdAt'
              }
            ).subscribe((status) => {

              subscriber.next(status);
              subscriber.complete();

            });

          }

        });

    });

  }


  updateDish(dishId: string, dishData: IDishDto): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      this.apiService
        .put<IDish>(
          baseUrl(`${apiConfig.endpoints.dish}/${dishId}`)
          ,
          {
            ...dishData
          }
        )
        .subscribe((result) => {

          if (result.status != 200) {

            this.notificationService.alert('Update failed!', result.message, 'error');
            subscriber.next(false);
            subscriber.complete()

          } else {

            this.getDishes(
              {
                restaurant: result.data?.restaurant
              },
              {
                page: 1,
                limit: 10,
                sort: '-createdAt'
              }
            ).subscribe((status) => {

              subscriber.next(status);
              subscriber.complete();

            });

          }

        });

    });

  }

}
