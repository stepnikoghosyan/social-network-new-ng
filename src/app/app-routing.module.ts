import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/homepage',
    pathMatch: 'full'
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
