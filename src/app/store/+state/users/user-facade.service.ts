import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as reducer from './user.reducer';
import * as Actions from './user.actions';
import { UserDetailsModel } from 'src/app/shared/models/user-details.model';

@Injectable({
  providedIn: 'root',
})
export class UserFacadeService {
  userDetails$: Observable<UserDetailsModel>;

  constructor(private store: Store<reducer.UserState>) {
    this.userDetails$ = this.store.pipe(select(reducer.getUserDetails));
  }

  getUserDetails(token: string): void {
    this.store.dispatch(new Actions.GetUserDetails(token));
  }

  updateUserDetails(user: UserDetailsModel, token: string): void {
    console.log('update');
    this.store.dispatch(new Actions.UpdateUserDetails({user, token}));
  }
}
