import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

// components
import {AuthComponent} from './auth.component';
import {SignupComponent} from './components/signup/signup.component';
import {SigninComponent} from './components/signin/signin.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {
}
