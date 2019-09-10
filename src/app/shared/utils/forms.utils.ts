import {FormGroup} from '@angular/forms';

export abstract class FormValidation {
  // Checks if for is invalid and the same time touched or dirty, or it has been submitted
  public isFieldInvalid(form: FormGroup, controlName: string, submitted: string): boolean {
    return form.get(controlName).invalid && form.get(controlName).touched && form.get(controlName).dirty ||
      form.get(controlName).pending || (form.get(controlName).invalid && this[submitted]);
  }

  // returns error class object for input field if field is invalid
  public displayErrorStyle(form: FormGroup, controlName: string, submitted: string, cssClass?: string): { [key: string]: boolean } {
    const styleClass = cssClass || 'form-input-error';
    if (this.isFieldInvalid(form, controlName, submitted)) {
    }
    return {
      [styleClass]: this.isFieldInvalid(form, controlName, submitted)
    };
  }
}
