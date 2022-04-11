import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from "../../services/session/session.service";


@Injectable({
  providedIn: 'root'
})
export class DataStorageResolver implements Resolve<boolean> {


  constructor(
    private sessionService: SessionService
  ) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return new Observable<boolean>(subscriber => {

      this.sessionService.getLoggedInUser().subscribe((status) => {

        subscriber.next(status);
        subscriber.complete();

      });

    });

  }

}
