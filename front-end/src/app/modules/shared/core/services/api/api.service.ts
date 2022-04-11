import { Injectable } from '@angular/core';
import { IResponseType } from "../../models/global/global-types";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) {
  }


  get<T>(url: string, options?: object): Observable<IResponseType<T> | any> {

    return this.httpClient.get<IResponseType<T> | any>(url, {...options});

  }


  post<T>(url: string, body: object, options?: object): Observable<IResponseType<T>> {

    return this.httpClient.post<IResponseType<T>>(url, {...body}, {...options});

  }


  put<T>(url: string, body: object, options?: object): Observable<IResponseType<T>> {

    return this.httpClient.put<IResponseType<T>>(url, {...body}, {...options});

  }


  delete<T>(url: string, options?: object): Observable<IResponseType<T>> {

    return this.httpClient.delete<IResponseType<T>>(url, {...options});

  }

}
