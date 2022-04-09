import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from "../../services/session/session.service";
import { isEmpty } from "../../services/utils/utils.service";

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {


  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token: string | null = this.sessionService.getToken();

    const urlPart: string = this.sessionService.getUrlPart();

    if (isEmpty(token) || isEmpty(urlPart)) {

      this.sessionService.removeToken();
      this.sessionService.removeUrlPart();
      this.router.navigate(['sign_in']).then();

    }

    return (isEmpty(token) || isEmpty(urlPart)) || state.url.includes(urlPart);

  }

}
