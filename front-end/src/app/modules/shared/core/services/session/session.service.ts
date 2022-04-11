import apiConfig from '../../../../../../assets/api.config.json';
import constants from '../../config/constants.config.json';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { IUser } from "../../models/schemas/user.schema";
import { ISignInRequirements, ISignUpRequirements } from "../../models/api/user.dto";
import { ApiService } from "../api/api.service";
import { baseUrl, decrypt, encrypt, isEmpty } from "../utils/utils.service";
import { NotificationService } from "../notification/notification.service";
import { Router } from "@angular/router";
import { E_UrlPart, E_UserType } from "../../models/global/static.enums";
import { IResponseType, ISignInResponse } from "../../models/global/global-types";
import {
  ADMIN_ROUTES,
  CUSTOMER_ROUTES,
  DELIVERY_ROUTES,
  RESTAURANT_ROUTES,
  RouteInfo
} from "../../models/global/constants.config";


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  get defaultRoutes(): RouteInfo[] {

    if (this.getUrlPart()) {

      switch (this.getUrlPart()) {

        case E_UrlPart.CUS:
          return CUSTOMER_ROUTES;

        case E_UrlPart.DEM:
          return DELIVERY_ROUTES;

        case E_UrlPart.ADM:
          return ADMIN_ROUTES;

        case E_UrlPart.RES:
          return RESTAURANT_ROUTES;

        default:
          return [];

      }

    } else {

      return [];

    }

  }


  public onlineUser: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);


  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {

  }


  getLoggedInUser(): Observable<boolean> {

    return new Observable<boolean>(subscriber => {

      this.apiService.get<IResponseType<IUser>>(baseUrl(apiConfig.endpoints.session.logged_in_user)).subscribe((result) => {

        if (result.status != 200) {

          this.notificationService.alert('No user found', result.message, 'error');
          subscriber.next(false);

        } else {

          this.onlineUser.next(result.data);
          subscriber.next(true);

        }

        subscriber.complete();

      });

    });

  }


  signIn(signInData: ISignInRequirements): Observable<boolean> {

    return new Observable<boolean>(subscriber => {

      this.apiService.post<ISignInResponse>(baseUrl(apiConfig.endpoints.session.sign_in), {...signInData}).subscribe((result) => {

        if (result.status != 200) {

          this.notificationService.alert('Login failed', result.message, 'error');
          subscriber.next(false);
          subscriber.complete();

        } else {

          switch (result.data!.user_type) {

            case E_UserType.ADM:
              this.setUrlPart(E_UrlPart.ADM);
              break;

            case E_UserType.RES:
              this.setUrlPart(E_UrlPart.RES);
              break;

            case E_UserType.DEM:
              this.setUrlPart(E_UrlPart.DEM);
              break;

            case E_UserType.CUS:
              this.setUrlPart(E_UrlPart.CUS);
              break;

            default:
              subscriber.next(false);
              subscriber.complete();
              break;

          }

          if (isEmpty(result.data!.token)) {

            subscriber.next(false);
            subscriber.complete();

          } else {

            this.setToken(result.data!.token);
            subscriber.next(true);
            subscriber.complete();


          }

        }

      });

    });

  }


  register(signUpData: ISignUpRequirements): Observable<boolean> {

    return new Observable<boolean>(subscriber => {

      this.apiService.post<ISignInResponse>(baseUrl(apiConfig.endpoints.session.sign_up), {...signUpData}).subscribe((result) => {

        if (result.status != 200) {

          this.notificationService.alert('Login failed', result.message, 'error');
          subscriber.next(false);

        } else {

          console.log(result);

          if (result.data?.user_type == E_UserType.CUS || !isEmpty(result.data?.token)) {

            this.setUrlPart(E_UrlPart.CUS);
            this.setToken(result.data!.token);
            subscriber.next(true);

          } else {

            subscriber.next(false);

          }

        }

        subscriber.complete();

      });

    });

  }


  signOut(): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      this.removeToken();
      this.removeUrlPart();

      this.router.navigate(['sign_in']).then((status) => {

        subscriber.next(status);
        subscriber.complete();

      });

    });

  }


  getToken(): string | null {

    return localStorage.getItem(constants.token_key);

  }


  setToken(token: string): void {

    localStorage.removeItem(constants.token_key);
    localStorage.setItem(constants.token_key, token);

  }


  removeToken(): void {

    localStorage.removeItem(constants.token_key);

  }


  getUrlPart(): string {

    try {

      const value: string | null = localStorage.getItem(constants.url_part_key);

      return isEmpty(value) ? '' : decrypt(value!);

    } catch (e) {

      return '';

    }

  }


  setUrlPart(urlPath: string): void {

    localStorage.removeItem(constants.url_part_key);
    localStorage.setItem(constants.url_part_key, encrypt(urlPath));

  }


  removeUrlPart(): void {

    localStorage.removeItem(constants.url_part_key);

  }

}
