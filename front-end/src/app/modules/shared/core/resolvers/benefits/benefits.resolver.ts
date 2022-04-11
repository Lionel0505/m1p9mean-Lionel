import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OrderService } from "../../services/order/order.service";
import { SessionService } from "../../services/session/session.service";
import { LoaderService } from "../../services/loader/loader.service";
import { E_DeliveryStatus, E_UserType } from "../../models/global/static.enums";
import { UserService } from "../../services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class BenefitsResolver implements Resolve<boolean> {

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private loaderService: LoaderService
  ) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      this.loaderService.hydrate(true);

      let query: any = {};

      if (state.url.includes('restaurant')) {

        Object.assign(query, {_id: this.sessionService.onlineUser.value?._id});

      } else if (state.url.includes('admin')) {

        Object.assign(query, {type: E_UserType.RES});

      }

      this.userService.getUsers(
        {
          ...query
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

    });

  }

}
