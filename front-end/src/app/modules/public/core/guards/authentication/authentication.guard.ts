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
import { SessionService } from "../../../../shared/core/services/session/session.service";
import { isEmpty } from "../../../../shared/core/services/utils/utils.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {

  constructor(
    public sessionService: SessionService,
    public router: Router
  ) {

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token: string | null = this.sessionService.getToken();

    const urlPart: string = this.sessionService.getUrlPart();

    if (!isEmpty(token) && !isEmpty(urlPart)) {

      this.router.navigate(['']).then();

    } else {

      this.sessionService.removeToken();
      this.sessionService.removeUrlPart();

    }

    return isEmpty(token);

  }


  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this.sessionService.getToken();

    const urlPart: string = this.sessionService.getUrlPart();

    if (isEmpty(token) || isEmpty(urlPart)) {

      this.sessionService.removeToken();
      this.sessionService.removeUrlPart();
      this.router.navigate(['sign_in']).then();

    }

    return !isEmpty(token);

  }

}
