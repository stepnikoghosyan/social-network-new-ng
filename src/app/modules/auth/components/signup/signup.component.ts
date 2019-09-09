import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

// utils
import {emailPattern, passwordPattern} from '../../../../shared/validators/patterns';
import {AuthService} from '../../services/auth.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SuccessResponseModel} from '../../../../shared/models/result.model';
import {AuthModel} from '../../models/response/auth.model';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {formErrorHandler} from '../../../../shared/utils/error-handlers';
import {FormValidation} from '../../../../shared/utils/forms';
import {IRegisterPayload} from '../../models/payload/register-payload.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends FormValidation implements OnInit, OnDestroy {

  public form: FormGroup;
  public errorResponseMessage: string;
  private submitted = false;
  private subscription = new Subject();

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.generateForm();
  }

  private generateForm(): void {
    // TODO: add gender and isPrivate (gender -> enum dropdown, isPrivate -> checkbox)
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      gender: [null, Validators.required],
      isPrivate: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(emailPattern)]],
      password: [null, [Validators.required, Validators.pattern(passwordPattern)]]
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.signin(this.form.value);
    }
  }

  private signin(payload: IRegisterPayload): void {
    this.submitted = true;

    this.authService.signin(payload).pipe(takeUntil(this.subscription)).subscribe(
      ((result: SuccessResponseModel<AuthModel>): void => {
        this.router.navigate(['/homepage']);
      }),
      ((error: HttpErrorResponse): void => {
        this.errorResponseMessage = formErrorHandler(this.form, error);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}
