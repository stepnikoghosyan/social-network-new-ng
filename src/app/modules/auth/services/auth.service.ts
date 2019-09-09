import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BaseRestService} from '../../../shared/services/base-rest.service';
import {AuthModel} from '../models/response/auth.model';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {IAuthPayload} from '../models/payload/auth-payload.model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {parseJwt} from '../../../shared/utils/helpers.utils';
import {SuccessResponseModel} from '../../../shared/models/result.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseRestService<AuthModel> {
  private readonly URL = 'auth';

  public user: AuthModel;

  constructor(
    private readonly http: HttpClient,
    private readonly httpBackend: HttpBackend,
    private readonly router: Router
  ) {
    super(http);
  }

  public static get isAuthenticated(): boolean {
    const token = AuthService.getAuthToken;
    try {
      // Check expiration date
      const {exp} = parseJwt(token);
      if (Date.now() / 1000 > exp) {
        return false;
      }
    } catch (err) {
      return false;
    }

    return true;

    // return !!token;
  }

  public static get getAuthToken(): string {
    return localStorage.getItem('authToken');
  }

  public static set setAuthToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  public static get getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
  }

  public static set setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  public signin(payload: IAuthPayload): Observable<SuccessResponseModel<AuthModel>> {
    const httpClient = new HttpClient(this.httpBackend);
    return httpClient.post<SuccessResponseModel<AuthModel>>(`${this.apiUrl}${this.URL}/login`, payload, {headers: null}).pipe(
      tap((res: SuccessResponseModel<AuthModel>): void => {
        this.user = res.data;
        AuthService.setAuthToken = res.data.authToken;
        AuthService.setRefreshToken = res.data.refreshToken;
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/auth/signin']);
  }
}
