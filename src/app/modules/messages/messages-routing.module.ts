import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// components
import {MessagesComponent} from './messages.component';
import {RoomComponent} from './components/room/room.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesComponent
  },
  {
    path: ':id',
    component: RoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule {
}
