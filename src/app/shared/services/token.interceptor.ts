import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

// services
import {AuthService} from '../../modules/auth/services/auth.service';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addAuthTokenToRequest(request, AuthService.getAuthToken);

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse) {
        switch ((error as HttpErrorResponse).status) {
          // case 401:
          //   return this.handle401Error(request, next);
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
    // if (!this.isRefreshingToken) {
    //   this.isRefreshingToken = true;
    //
    //   // Reset here so that the following requests wait until the token
    //   // comes back from the refreshToken call.
    //   this.tokenSubject.next(null);
    //
    //   return this.authService.getNewAccessToken().pipe(
    //     switchMap((newTokens: Partial<AuthModel>) => {
    //       if (newTokens) {
    //         // localStorage.setItem('token', newTokens.auth_token);
    //         // localStorage.setItem('refreshToken', newTokens.refresh_token);
    //         this.authService.setAuthToken = newTokens.auth_token;
    //         this.authService.setRefreshToken = newTokens.refresh_token;
    //         this.tokenSubject.next(newTokens.auth_token);
    //         return next.handle(this.addAuthTokenToRequest(req, newTokens.auth_token));
    //       }
    //     }),
    //     catchError(err => {
    //       this.authService.logout();
    //       return throwError('');
    //     }),
    //     finalize(() => {
    //       this.isRefreshingToken = false;
    //     })
    //   );
    // } else {
    //   return this.tokenSubject.pipe(
    //     filter(token => token != null),
    //     take(1),
    //     switchMap(token => {
    //       return next.handle(this.addAuthTokenToRequest(req, token));
    //     })
    //   );
    // }
  }

  private addAuthTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (!token) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: token
      }
    });
  }

}
