import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from "../../services/session/session.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public sessionService: SessionService
  ) {
  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.sessionService.getToken()}`
      }
    });

    return next.handle(request);

  }

}
