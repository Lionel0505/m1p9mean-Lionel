import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from "../../services/session/session.service";
import { isEmpty } from "../../services/utils/utils.service";

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivateChild {


  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {
  }


  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const urlPart: string = this.sessionService.getUrlPart();

    if (!state.url.includes(urlPart)) {

      this.router.navigate([urlPart]);

    }

    return state.url.includes(urlPart);

  }

}
