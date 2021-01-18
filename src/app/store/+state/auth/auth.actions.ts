import { Action } from '@ngrx/store';
import { UserDetsRespModel } from './auth-helper';

export enum AuthActionTypes {
  GET_USER_DETAILS = '[Auth] Get User Details',
  GET_USER_DETAILS_SUCCESS = '[Auth] Get User Details Success',
}

export class GetUserDetails implements Action {
  readonly type = AuthActionTypes.GET_USER_DETAILS;
  constructor(public payload: string) { }
}

export class GetUserDetailsSuccess implements Action {
  readonly type = AuthActionTypes.GET_USER_DETAILS_SUCCESS;
  constructor(public payload: UserDetsRespModel) {}
}

export type AuthActions =
  | GetUserDetails
  | GetUserDetailsSuccess;
