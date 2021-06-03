import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  // intercepts all http request
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        // ako nema usera onda vrati defualtni request, u protivnom baca grešku zato jer je po defaultu user null
        if (!user) {
          return next.handle(req);
        }
        const modifiedREq = req.clone({
          params: new HttpParams().set('auth', user.tokenValue),
        });
        return next.handle(modifiedREq);
      })
    );
  }
}
