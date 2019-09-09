import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

// utils
import {FormValidation} from '../../../../shared/utils/forms';
import {emailPattern} from '../../../../shared/validators/patterns';
import {formErrorHandler} from '../../../../shared/utils/error-handlers';

// services
import {AuthService} from '../../services/auth.service';

// models
import {SuccessResponseModel} from '../../../../shared/models/result.model';
import {IAuthPayload} from '../../models/payload/auth-payload.model';
import {AuthModel} from '../../models/response/auth.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends FormValidation implements OnInit, OnDestroy {

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
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(emailPattern)]],
      password: [null, [Validators.required]]
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.signin(this.form.value);
    }
  }

  public signin(payload: IAuthPayload): void {
    this.submitted = true;

    this.authService.signin(payload).pipe(takeUntil(this.subscription)).subscribe(
      ((result: SuccessResponseModel<AuthModel>): void => {
        this.router.navigate(['/homepage']);
      }),
      (error: HttpErrorResponse): void => {
        this.errorResponseMessage = formErrorHandler(this.form, error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}
