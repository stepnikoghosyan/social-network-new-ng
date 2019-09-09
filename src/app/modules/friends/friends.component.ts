import {Component, OnDestroy, OnInit} from '@angular/core';
import {FriendsService} from './services/friends.service';
import {Subscription} from 'rxjs';
import {UserModel} from './models/user.model';

export enum PAGE_MODE {
  requests = 'friend-requests',
  search = 'search'
}

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, OnDestroy {

  public PAGE_MODES = PAGE_MODE;
  public mode = PAGE_MODE.requests;

  public searchResult: Array<UserModel> = [];
  private $subscription: Subscription;

  constructor(
    private readonly service: FriendsService,
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.$subscription) {
      this.$subscription.unsubscribe();
    }
  }

  public getData(value: string): void {
    if (value) {
      this.$subscription = this.service.searchUser({firstName: value})
        .subscribe(result => {
          console.log('Search result:', result);
          this.searchResult = result.data.items;
        });
    }
  }

  public set setMode(val: PAGE_MODE) {
    this.mode = val;
  }
}
