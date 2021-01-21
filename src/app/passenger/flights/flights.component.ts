import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../../shared/services/flight.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {

  searchQuery = '';
  search = null;

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.searchQuery = routeParams.searchQuery;
      this.search = JSON.parse(this.searchQuery);
      this.flightsService.searchFlights(this.searchQuery).subscribe(resp => { });
    });
  }

}
