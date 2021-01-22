export interface Flight {
  name: string;
  from: string;
  to: string;
  price: number;
  numOfStops: number;
  arrival: string;
  dept: string;
  numOfSeats: number;
  seatsAvailable: number;
  flightImage: string;
  flightTail: string;
  brand: string;
  handicappedAllowed: boolean;
  ancillaryServices: string[];
  createdDate: Date;
}
