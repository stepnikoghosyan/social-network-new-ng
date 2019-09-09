import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ISearchUserQueryParams} from '../models/search-user-query-param.model';
import {Observable} from 'rxjs';
import {PaginationResultModel} from '../../../shared/models/result.model';
import {UserModel} from '../models/user.model';

export function anyToHttpParams(obj: {[key: string]: string | number; }): HttpParams {
  let param = new HttpParams();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      param = param.set(key, obj[key] as string);
    }
  }
  return param;
}

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private readonly URL = 'friends';

  constructor(private readonly http: HttpClient) {
  }

  public searchUser(params: ISearchUserQueryParams): Observable<PaginationResultModel<UserModel>> {
    return this.http.get<PaginationResultModel<UserModel>>(`${environment.api}users/search`, {
      params: anyToHttpParams(params as {[key: string]: string | number; })
    });
  }

}
