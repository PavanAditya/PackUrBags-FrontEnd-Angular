import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as FlightActions from './flight.actions';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable()
export class FlightEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService
  ) { }

  @Effect()
  getUserDetails$: Observable<Action> = this.actions$.pipe(
    ofType<FlightActions.GetUserDetails>(
      FlightActions.FlightActionTypes.GET_USER_DETAILS
    ),
    map((action: FlightActions.GetUserDetails) => action.payload),
    switchMap(reqData =>
      forkJoin([
        this.userService.userData(reqData),
      ]).pipe(
        map(res => {
          if (res) {
            const userDetails = res[0].body;
            return new FlightActions.GetUserDetailsSuccess(userDetails);
          }
        })
      )
    )
  );
}
