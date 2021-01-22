import { Action } from '@ngrx/store';
import { FlightDetsRespModel } from '../../../shared/models/flight-dets-response.model';

export enum FlightActionTypes {
  GET_FLIGHT_DETAILS = '[Flight] Get Flight Details',
  GET_FLIGHT_DETAILS_SUCCESS = '[Flight] Get Flight Details Success',
}

export class GetFlightDetails implements Action {
  readonly type = FlightActionTypes.GET_FLIGHT_DETAILS;
  constructor(public payload: string) { }
}

export class GetFlightDetailsSuccess implements Action {
  readonly type = FlightActionTypes.GET_FLIGHT_DETAILS_SUCCESS;
  constructor(public payload: FlightDetsRespModel) {}
}

export type FlightActions =
  | GetFlightDetails
  | GetFlightDetailsSuccess;
