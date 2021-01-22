import { Flight } from './flight.model';

export interface FlightDetsRespModel {
  status: number;
  message: string;
  dataObject: {
    appName: string;
    routeName: string;
    data: Flight[];
  };
}
