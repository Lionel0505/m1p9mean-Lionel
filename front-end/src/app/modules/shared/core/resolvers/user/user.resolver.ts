import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../../services/user/user.service";
import { E_UserType } from "../../models/global/static.enums";
import { isEmpty } from "../../services/utils/utils.service";
import { LoaderService } from "../../services/loader/loader.service";


@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<boolean> {

  constructor(
    private userService: UserService,
    private loaderService: LoaderService
  ) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      this.loaderService.hydrate(true);

      let type: string;

      if (state.url.includes('administrators')) {

        type = E_UserType.ADM;

      } else if (state.url.includes('delivery-men')) {

        type = E_UserType.DEM;

      } else if (state.url.includes('customers')) {

        type = E_UserType.CUS;

      } else if (state.url.includes('restaurants')) {

        type = E_UserType.RES;

      } else {

        type = '';

      }

      if (isEmpty(type)) {

        subscriber.next(false);
        subscriber.complete();

      } else {

        this.userService.getUsers(
          {
            type: type
          },
          {
            page: 1,
            limit: 10,
            sort: '-createdAt'
          }
        ).subscribe((status) => {

          this.loaderService.hydrate(false);
          subscriber.next(status);
          subscriber.complete();

        });

      }

    });

  }

}
