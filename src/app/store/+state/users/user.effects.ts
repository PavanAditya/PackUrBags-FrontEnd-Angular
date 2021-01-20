import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as UserActions from './user.actions';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService
  ) { }

  @Effect()
  getUserDetails$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.GetUserDetails>(
      UserActions.UserActionTypes.GET_USER_DETAILS
    ),
    map((action: UserActions.GetUserDetails) => action.payload),
    switchMap(reqData =>
      forkJoin([
        this.userService.userData(reqData),
      ]).pipe(
        map(res => {
          if (res) {
            const userDetails = res[0].body;
            return new UserActions.GetUserDetailsSuccess(userDetails);
          }
        })
      )
    )
  );

  @Effect()
  updateUserDetails$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.UpdateUserDetails>(
      UserActions.UserActionTypes.UPDATE_USER_DETAILS
    ),
    map((action: UserActions.UpdateUserDetails) => action.payload),
    switchMap(reqData =>
      forkJoin([
        this.userService.updateUserData(reqData.user, reqData.token),
      ]).pipe(
        map(res => {
          if (res) {
            const userDetails = res[0].body;
            return new UserActions.GetUserDetailsSuccess(userDetails);
          }
        })
      )
    )
  );
}
