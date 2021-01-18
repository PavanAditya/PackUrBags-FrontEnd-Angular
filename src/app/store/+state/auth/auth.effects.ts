import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) { }

  @Effect()
  getUserDetails$: Observable<Action> = this.actions$.pipe(
    ofType<AuthActions.GetUserDetails>(
      AuthActions.AuthActionTypes.GET_USER_DETAILS
    ),
    map((action: AuthActions.GetUserDetails) => action.payload),
    switchMap(reqData =>
      forkJoin([
        this.authService.userData(reqData),
      ]).pipe(
        map(res => {
          if (res) {
            const userDetails = res[0].body;
            return new AuthActions.GetUserDetailsSuccess(userDetails);
          }
        })
      )
    )
  );
}
