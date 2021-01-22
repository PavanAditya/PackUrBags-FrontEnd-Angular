import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as reducer from './flight.reducer';
import * as Actions from './flight.actions';
import { Flight } from '../../../shared/models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightFacadeService {
  flightsList$: Observable<Flight[]>;

  constructor(private store: Store<reducer.FlightState>) {
    this.flightsList$ = this.store.pipe(select(reducer.getFlightsList));
  }

  getFlightDetails(token: string): void {
    this.store.dispatch(new Actions.GetFlightDetails(token));
  }
}
