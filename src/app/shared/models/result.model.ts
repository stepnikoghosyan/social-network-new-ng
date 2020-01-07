export interface PaginationResultModel<T> {
  statusCode: number;
  data: {
    count: number;
    items: Array<T>
  };
}

export interface SuccessResponseModel<T> {
  statusCode: number;
  data: T;
}

export interface ErrorResponseModel {
  statusCode: string;
  errorMessage: string;
}

export interface FormErrorResponseModel extends ErrorResponseModel {
  field: string;
  code: string;
}
