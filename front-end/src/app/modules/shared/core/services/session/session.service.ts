import apiConfig from '../../../../../../assets/api.config.json';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { IUser } from "../../models/schemas/user.schema";
import { ISignInRequirements } from "../../models/api/sign-in.dto";
import { ApiService } from "../api/api.service";
import { baseUrl, decrypt, encrypt, isEmpty } from "../utils/utils.service";
import { NotificationService } from "../notification/notification.service";
import { Router } from "@angular/router";
import { E_UrlPart, E_UserType } from "../../models/global/static.enums";
import { ISignInResponse } from "../../models/global/global-types";


const TOKEN_KEY: string = '624d9ae426624d9ae426a0fd1c1d7bb7ada0fd1c1d7bb7ad';
const URL_PART_KEY: string = '624db2e1567624db2e156799a0cc0c9692299a0cc0c96922';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public onlineUser: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);


  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {

  }


  signIn(signInData: ISignInRequirements): Observable<boolean> {

    return new Observable<boolean>(subscriber => {

      this.apiService.post<ISignInResponse>(baseUrl(apiConfig.endpoints.session.sign_in), { ...signInData }).subscribe((result) => {

        if (result.status != 200) {

          this.notificationService.alert('Login failed', result.message, 'error');
          subscriber.next(false);

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

          }

          subscriber.next(true);

        }

        subscriber.complete();

      });

    });

  }


  signOut(path: string): void {

    this.removeToken();
    this.removeUrlPart();
    this.router.navigate([`${path}/sign_in`]).then();

  }


  getToken(): string | null {

    return localStorage.getItem(TOKEN_KEY);

  }


  setToken(token: string): void {

    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);

  }


  removeToken(): void {

    localStorage.removeItem(TOKEN_KEY);

  }


  getUrlPart(): string {

    try {

      const value: string | null = localStorage.getItem(URL_PART_KEY);

      return isEmpty(value) ? '' : decrypt(value!);

    } catch (e) {

      return '';

    }

  }


  setUrlPart(urlPath: string): void {

    localStorage.removeItem(URL_PART_KEY);
    localStorage.setItem(URL_PART_KEY, encrypt(urlPath));

  }


  removeUrlPart(): void {

    localStorage.removeItem(URL_PART_KEY);

  }

}
