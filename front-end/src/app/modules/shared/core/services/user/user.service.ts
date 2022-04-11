import apiConfig from "../../../../../../assets/api.config.json";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { IUser } from "../../models/schemas/user.schema";
import { ApiService } from "../api/api.service";
import { NotificationService } from "../notification/notification.service";
import { baseUrl } from "../utils/utils.service";
import { ISignUpRequirements } from "../../models/api/user.dto";
import { PaginationService } from "../pagination/pagination.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);


  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private paginationService: PaginationService
  ) {
  }


  getUsers(query: any, options: any): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      this.apiService
        .get<any>(
          baseUrl(apiConfig.endpoints.user)
          , {
            params: {query: JSON.stringify(query), options: JSON.stringify(options)}
          }
        )
        .subscribe((result) => {

          if (result.status != 200) {

            this.notificationService.alert('No data found', result.message, 'error');
            subscriber.next(false);

          } else {

            this.users.next(result.data.items);
            this.paginationService.setPaginationData(result.data.paginator);
            subscriber.next(true);

          }

          subscriber.complete()

        });

    });

  }


  getAvailableDeliveryMen(): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      this.apiService
        .get<IUser[]>(
          baseUrl(apiConfig.endpoints.delivery_men)
        )
        .subscribe((result) => {

          if (result.status != 200) {

            this.notificationService.alert('No data found', result.message, 'error');
            subscriber.next(false);

          } else {

            this.users.next(result.data);
            subscriber.next(true);

          }

          subscriber.complete()

        });

    });

  }


  createUser(userData: ISignUpRequirements): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      this.apiService
        .post<IUser>(
          baseUrl(apiConfig.endpoints.user)
          , {
            ...userData
          }
        )
        .subscribe((result) => {

          if (result.status != 200) {

            this.notificationService.alert('Creation failed!', result.message, 'error');
            subscriber.next(false);
            subscriber.complete()

          } else {

            this.getUsers(
              {
                type: result.data?.type
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


  updateUser(userId: string, userData: ISignUpRequirements): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      this.apiService
        .put<IUser>(
          baseUrl(`${apiConfig.endpoints.user}/${userId}`)
          ,
          {
            ...userData
          }
        )
        .subscribe((result) => {

          if (result.status != 200) {

            this.notificationService.alert('Update failed!', result.message, 'error');
            subscriber.next(false);
            subscriber.complete()

          } else {

            this.getUsers(
              {
                type: result.data?.type
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
