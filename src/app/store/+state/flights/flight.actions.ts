import { Action } from '@ngrx/store';
import { UserDetsRespModel } from './flight-helper';

export enum FlightActionTypes {
  GET_USER_DETAILS = '[Flight] Get User Details',
  GET_USER_DETAILS_SUCCESS = '[Flight] Get User Details Success',
}

export class GetUserDetails implements Action {
  readonly type = FlightActionTypes.GET_USER_DETAILS;
  constructor(public payload: string) { }
}

export class GetUserDetailsSuccess implements Action {
  readonly type = FlightActionTypes.GET_USER_DETAILS_SUCCESS;
  constructor(public payload: UserDetsRespModel) {}
}

export type FlightActions =
  | GetUserDetails
  | GetUserDetailsSuccess;
