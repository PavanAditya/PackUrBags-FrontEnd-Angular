import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as FlightActions from './flight.actions';
import { FlightService } from '../../../shared/services/flight.service';

@Injectable()
export class FlightEffects {
  constructor(
    private actions$: Actions,
    private flightService: FlightService
  ) { }

  @Effect()
  getFlightDetails$: Observable<Action> = this.actions$.pipe(
    ofType<FlightActions.GetFlightDetails>(
      FlightActions.FlightActionTypes.GET_FLIGHT_DETAILS
    ),
    map((action: FlightActions.GetFlightDetails) => action.payload),
    switchMap(reqData =>
      forkJoin([
        this.flightService.searchFlights(reqData),
      ]).pipe(
        map(res => {
          if (res[0].body) {
            const flightsList = res[0].body;
            return new FlightActions.GetFlightDetailsSuccess(flightsList);
          } else {
            return new FlightActions.GetFlightDetailsSuccess({ status: 204, dataObject: null, message: 'No Flights Found' });
          }
        }, err => {
          return new FlightActions.GetFlightDetailsSuccess({ status: err.error.status, dataObject: null, message: 'Flight Search Failed' });
        })
      )
    )
  );
}
