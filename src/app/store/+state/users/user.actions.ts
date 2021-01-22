import { Action } from '@ngrx/store';
import { UserDetailsModel } from 'src/app/shared/models/user-details.model';
import { UserDetsRespModel } from '../../../shared/models/user-dets-response.model';

export enum UserActionTypes {
  GET_USER_DETAILS = '[User] Get User Details',
  GET_USER_DETAILS_SUCCESS = '[User] Get User Details Success',
  UPDATE_USER_DETAILS = '[User] Update User Details',
}

export class GetUserDetails implements Action {
  readonly type = UserActionTypes.GET_USER_DETAILS;
  constructor(public payload: string) { }
}

export class GetUserDetailsSuccess implements Action {
  readonly type = UserActionTypes.GET_USER_DETAILS_SUCCESS;
  constructor(public payload: UserDetsRespModel) {}
}

export class UpdateUserDetails implements Action {
  readonly type = UserActionTypes.UPDATE_USER_DETAILS;
  constructor(public payload: { user: UserDetailsModel, token: string }) { }
}

export type UserActions =
  | GetUserDetails
  | GetUserDetailsSuccess;
