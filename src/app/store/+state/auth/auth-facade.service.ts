import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as reducer from './auth.reducer';
import * as Actions from './auth.actions';
import { UserDetailsModel } from 'src/app/shared/models/user-details.model';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  userDetails$: Observable<UserDetailsModel>;

  constructor(private store: Store<reducer.AuthState>) {
    this.userDetails$ = this.store.pipe(select(reducer.getUserDetails));
  }

  getUserDetails(token: string): void {
    this.store.dispatch(new Actions.GetUserDetails(token));
  }
}
