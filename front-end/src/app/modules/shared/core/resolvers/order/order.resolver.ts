import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { E_DeliveryStatus } from "../../models/global/static.enums";
import { OrderService } from "../../services/order/order.service";
import { SessionService } from "../../services/session/session.service";
import { LoaderService } from "../../services/loader/loader.service";


@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<boolean> {

  constructor(
    private orderService: OrderService,
    private sessionService: SessionService,
    private loaderService: LoaderService
  ) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      this.loaderService.hydrate(true);

      let query: any = {};

      if (state.url.includes('restaurant')) {

        Object.assign(query, {restaurant: this.sessionService.onlineUser.value?._id});

      } else if (state.url.includes('delivery')) {

        Object.assign(query, {deliveryMan: this.sessionService.onlineUser.value?._id, status: E_DeliveryStatus.TOD});

      }

      this.orderService.getOrders(
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
