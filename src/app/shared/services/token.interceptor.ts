import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, finalize, switchMap, take} from 'rxjs/operators';

// services
import {AuthService} from '../../modules/auth/services/auth.service';

// models
import {AuthModel} from '../../modules/auth/models/response/auth.model';
import {SuccessResponseModel} from '../models/result.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshingToken = false;
  private tokenSubject = new BehaviorSubject<string>(null);

  constructor(private readonly authService: AuthService) {
  }

  private static addAuthTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (!token) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: token
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = TokenInterceptor.addAuthTokenToRequest(request, AuthService.getAuthToken);

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse) {
        switch ((error as HttpErrorResponse).status) {
          case 401:
            return this.handle401Error(request, next);
          case 403:
            this.authService.logout();
            return throwError(error);
          case 404:
            console.log('Not found.');
            return throwError(error);
          case 500:
            console.log('Something went wrong.');
            return throwError(error);
          default:
            return throwError(error);
        }
      } else {
        return throwError(error);
      }
    }));
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.authService.getNewTokens().pipe(
        switchMap((result: SuccessResponseModel<Partial<AuthModel>>) => {
          if (result && result.data && result.data.authToken && result.data.refreshToken) {
            AuthService.setAuthToken = result.data.authToken;
            AuthService.setRefreshToken = result.data.refreshToken;
            this.tokenSubject.next(result.data.authToken);
            return next.handle(TokenInterceptor.addAuthTokenToRequest(req, result.data.authToken));
          }
        }),
        catchError(err => {
          this.authService.logout();
          return throwError('');
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(TokenInterceptor.addAuthTokenToRequest(req, token));
        })
      );
    }
  }

}
