import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// modules
import {MessagesRoutingModule} from './messages-routing.module';

// components
import {MessagesComponent} from './messages.component';
import {RoomComponent} from './components/room/room.component';

@NgModule({
  declarations: [
    MessagesComponent,
    RoomComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule
  ],
  bootstrap: [MessagesComponent]
})
export class MessagesModule {
}
