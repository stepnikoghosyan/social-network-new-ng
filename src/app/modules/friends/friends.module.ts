import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// modules
import {FriendsRoutingModule} from './friends-routing.module';

// components
import {FriendsComponent} from './friends.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [FriendsComponent],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [FriendsComponent]
})
export class FriendsModule {
}
