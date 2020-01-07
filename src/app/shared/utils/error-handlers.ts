import {FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {FormErrorResponseModel} from '../models/result.model';

export function formErrorHandler(formGroup: FormGroup, error: HttpErrorResponse): string {
  if (error.status >= 500) {
    return 'Something went wrong. Please, try again later.';
  }

  const err = error.error as FormErrorResponseModel;
  if (err.field && formGroup.get(err.field)) {
    // TODO: how to set message under this field
    formGroup.get(err.field).setErrors({[err.code]: true});
    return null;
  }

  return err.errorMessage;
}
