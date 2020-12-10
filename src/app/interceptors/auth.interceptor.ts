import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // request = request.clone({headers: request.headers.set('Authorization', localStorage.getItem('token'))});
    const head = sessionStorage.getItem('token');
    if (head != null) {
      request = request.clone({setHeaders: {Authorization : head}});
    }
    return next.handle(request);
  }
}
