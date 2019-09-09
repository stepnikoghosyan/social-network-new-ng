import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

// modules
import {AuthRoutingModule} from './auth-routing.module';

// components
import {AuthComponent} from './auth.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    AuthComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  bootstrap: [
    AuthComponent
  ]
})
export class AuthModule {
}
