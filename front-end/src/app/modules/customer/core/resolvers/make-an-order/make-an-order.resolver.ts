import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DishService } from "../../../../shared/core/services/dish/dish.service";
import { isEmpty } from "../../../../shared/core/services/utils/utils.service";

@Injectable({
  providedIn: 'root'
})
export class MakeAnOrderResolver implements Resolve<boolean> {


  constructor(
    private dishService: DishService
  ) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {


    return new Observable<boolean>(subscriber => {

      const restaurantId: string = route.params['restaurant_id'];

      if (isEmpty(restaurantId)) {

        subscriber.next(false);
        subscriber.complete();

      } else {

        this.dishService
          .getDishes(
            {
              restaurant: restaurantId,
              visible: true
            },
            {
              page: 1,
              limit: 10,
              sort: 'name'
            }
          )
          .subscribe((status) => {

            subscriber.next(status);
            subscriber.complete();

          });

      }

    });

  }
}
