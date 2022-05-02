import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let autReq = req;
    const token = this.tokenService.getToken();

    if (token != null) {
      autReq = req.clone({ headers: req.headers.set('Authorization','Bearer ' + token) });
    }
    return next.handle(autReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.tokenService.logOut();
        window.location.reload();
      }
      else {
        return throwError(error);
      }
    }));
  }

}

//export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}];