import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// guards
import {SigninGuard} from './shared/guards/signin.guard';
import {AuthGuard} from './shared/guards/auth.guard';

// components
import {LayoutComponent} from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/homepage'
      },
      {
        path: 'homepage',
        loadChildren: () => import('./modules/homepage/homepage.module').then(mod => mod.HomepageModule)
      },
      {
        path: 'friends',
        loadChildren: () => import('./modules/friends/friends.module').then(mod => mod.FriendsModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('./modules/messages/messages.module').then(mod => mod.MessagesModule)
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule),
    canActivate: [SigninGuard]
  },
  // {
  //   path: 'not-found',
  //   component: NotFoundComponent
  // },
  // {
  //   path: '**',
  //   component: NotFoundComponent
  // }
  {
    path: '**',
    component: LayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
