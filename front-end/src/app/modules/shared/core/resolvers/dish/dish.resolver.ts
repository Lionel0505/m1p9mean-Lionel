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
import { E_DeliveryStatus } from "../../models/global/static.enums";
import { DishService } from "../../services/dish/dish.service";
import { isEmpty } from "../../services/utils/utils.service";

@Injectable({
  providedIn: 'root'
})
export class DishResolver implements Resolve<boolean> {

  constructor(
    private dishService: DishService,
    private sessionService: SessionService,
    private loaderService: LoaderService
  ) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      const restaurantId: string = String(route.params['restaurant_id']);

      this.loaderService.hydrate(true);

      let query: any = {};

      if (isEmpty(route.params['restaurant_id']) && state.url.includes('restaurant')) {

        Object.assign(query, {restaurant: this.sessionService.onlineUser.value?._id});

      } else {

        Object.assign(query, {restaurant: restaurantId});

      }

      this.dishService.getDishes(
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
