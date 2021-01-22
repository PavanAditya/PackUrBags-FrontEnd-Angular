import * as FlightActions from './flight.actions';
import { Flight } from '../../../shared/models/flight.model';

export interface FlightData {
  flight: {
    flightsList: Flight[]
  };
}

export interface FlightState {
  flight: FlightData;
}

export const initialState: FlightData = {
  flight: {
    flightsList: []
  }
};

export function FlightReducer(
  state = initialState,
  action: FlightActions.FlightActions
): any {
  switch (action.type) {
    case FlightActions.FlightActionTypes.GET_FLIGHT_DETAILS_SUCCESS: {
      const flightsList = action.payload;
      let flightsListResp;
      if (flightsList.status === 204) {
        flightsListResp = [{sl:'sk'}];
      } else if (flightsList.status === 200) {
        flightsListResp = flightsList.dataObject.data;
      } else {
        flightsListResp = [];
      }
      return {
        ...state,
        flight: {
          ...state.flight,
          flightsList: [...flightsListResp]
        },
      };
    }
    default:
      return state;
  }
}

export const getFlightsList = (state: FlightState) => {
  return state.flight.flight.flightsList;
};
