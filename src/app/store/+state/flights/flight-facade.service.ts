import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as reducer from './flight.reducer';
import * as Actions from './flight.actions';
import { UserDetailsModel } from 'src/app/shared/models/user-details.model';

@Injectable({
  providedIn: 'root',
})
export class FlightFacadeService {
  userDetails$: Observable<UserDetailsModel>;

  constructor(private store: Store<reducer.FlightState>) {
    this.userDetails$ = this.store.pipe(select(reducer.getUserDetails));
  }

  getUserDetails(token: string): void {
    this.store.dispatch(new Actions.GetUserDetails(token));
  }
}
