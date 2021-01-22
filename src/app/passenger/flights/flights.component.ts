import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FlightService } from '../../shared/services/flight.service';
import { FlightFacadeService } from '../../store/+state/flights/flight-facade.service';
import { Flight } from '../../shared/models/flight.model';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {

  unSubscribe = new Subject<void>();

  searchQuery = '';
  search = null;
  flights: Flight[];

  constructor(
    private route: ActivatedRoute,
    private flightsFacadeService: FlightFacadeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.searchQuery = routeParams.searchQuery;
      this.search = JSON.parse(this.searchQuery);
      this.flightsFacadeService.getFlightDetails(this.searchQuery);
      this.flightsFacadeService.flightsList$
        .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
        .subscribe(flights => {
          this.flights = flights;
        });
    });
  }

}
