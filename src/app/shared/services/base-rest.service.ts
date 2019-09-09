import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

// models
import {PaginationResultModel, SuccessResponseModel} from '../models/result.model';

export abstract class BaseRestService<ResponseType> {
  protected apiUrl: string;

  protected constructor(protected httpClient: HttpClient) {
    this.apiUrl = environment.api;
  }

  protected getById(endpoint: string, id: string, headers?: HttpHeaders): Observable<SuccessResponseModel<ResponseType>> {
    return this.httpClient.get<SuccessResponseModel<ResponseType>>(`${this.apiUrl}${endpoint}/${id}/`, {
      headers
    });
  }

  protected getByPagination(endpoint: string, params?: HttpParams): Observable<PaginationResultModel<ResponseType>> {
    return this.httpClient.get<PaginationResultModel<ResponseType>>(`${this.apiUrl}${endpoint}/`, {
      params
    });
  }

  protected create<PayloadType>(endpoint: string, item: PayloadType): Observable<SuccessResponseModel<ResponseType>> {
    return this.httpClient.post<SuccessResponseModel<ResponseType>>(`${this.apiUrl + endpoint}/`, item);
  }

  protected editPut<PayloadType>(endpoint: string, id: number, data: PayloadType): Observable<SuccessResponseModel<ResponseType>> {
    return this.httpClient.put<SuccessResponseModel<ResponseType>>(`${this.apiUrl + endpoint}/${id}/`, data);
  }

  protected deleteById(endpoint: string, id: number) {
    return this.httpClient.delete(`${this.apiUrl + endpoint}/${id}/`);
  }

  // protected editPatch<Type>(endpoint: string, data: any, id?: number): Observable<Type> {
  //   return this.httpClient.patch<Type>(`${this.apiUrl + endpoint}/${id && (id + '/')}`, data);
  // }
}
