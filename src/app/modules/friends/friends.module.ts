import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// modules
import {FriendsRoutingModule} from './friends-routing.module';

// components
import {FriendsComponent} from './friends.component';

@NgModule({
  declarations: [FriendsComponent],
  imports: [
    CommonModule,
    FriendsRoutingModule
  ],
  bootstrap: [FriendsComponent]
})
export class FriendsModule {
}
