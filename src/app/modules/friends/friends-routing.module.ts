import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// components
import {FriendsComponent} from './friends.component';

const routes: Routes = [
  {path: '', component: FriendsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule {
}
