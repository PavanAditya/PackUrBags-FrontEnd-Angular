import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import { FlightService } from '../../shared/services/flight.service';
import { FlightFacadeService } from '../../store/+state/flights/flight-facade.service';
import { Flight } from '../../shared/models/flight.model';
import { FormControl } from '@angular/forms';
import { Airport } from '../../shared/models/airport.model';
import { airportsList } from '../../shared/mocks/airports.mock';
import { UserFacadeService } from '../../store/+state/users/user-facade.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlightsComponent implements OnInit, OnDestroy {

  unSubscribe = new Subject<void>();

  user = null;
  searchQuery = '';
  search = null;
  flights: Flight[];
  from = new FormControl('');
  to = new FormControl('');
  fromDate = new FormControl('');
  toDate = new FormControl('');
  adults = '1';
  children = '0';
  panelOpenState = false;
  filteredFromAirportsList: Observable<Airport[]>;
  filteredToAirportsList: Observable<Airport[]>;
  fromAirportsList: Airport[] = airportsList;
  toAirportsList: Airport[] = airportsList;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userFacadeService: UserFacadeService,
    private flightsFacadeService: FlightFacadeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.searchQuery = routeParams.searchQuery;
      this.search = JSON.parse(this.searchQuery);
      this.fillFilterData(this.search);
      this.flightsFacadeService.getFlightDetails(this.searchQuery);
      this.flightsFacadeService.flightsList$
        .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
        .subscribe(flights => {
          this.flights = flights;
        });
    });
    this.userFacadeService.userDetails$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe(user => {
        this.user = user;
        console.log(this.user);
      });
    this.filteredFromAirportsList = this.from.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterFromCities(value))
      );
    this.filteredToAirportsList = this.to.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterToCities(value))
      );
  }

  swapCities(): void {
    const tempCity = this.from.value;
    this.from.setValue(this.to.value);
    this.to.setValue(tempCity);
  }

  fillFilterData(search): void {
    const {
      from,
      to,
      fromDate,
      toDate,
      adults,
      children
    } = search;
    this.from.patchValue(from);
    this.to.patchValue(to);
    this.fromDate.patchValue(fromDate);
    this.toDate.patchValue(toDate ? toDate : null);
    this.adults = adults;
    this.children = children;
    console.log(this.from);
  }

  searchFlights(): void {
    this.search = {
      ...this.search,
      from: this.from.value,
      to: this.to.value,
      fromDate: this.fromDate.value,
      toDate: this.toDate.value,
      adults: this.adults,
      children: this.children,
    };
    // if (this.toDate.value === 'one-way') {
    //   delete this.search[`toDate`];
    // }
    this.router.navigate(['flights', JSON.stringify(this.search)]);
  }

  displayValue(airportCode: string): string {
    const airport: Airport = airportsList.find(el => el.IATA_code === airportCode);
    return airport ? `${airport.city_name} (${airport.IATA_code})` : '';
  }

  private filterFromCities(value: string): Airport[] {
    const filterValue = (typeof value === 'string') ? value.toLowerCase() : this.from.value;
    return this.fromAirportsList.filter(option =>
      (option.city_name.toLowerCase().includes(filterValue) || option.IATA_code.toLowerCase().includes(filterValue))
    );
  }

  private filterToCities(value: string): Airport[] {
    const filterValue = (typeof value === 'string') ? value.toLowerCase() : this.to.value;
    return this.toAirportsList.filter(option =>
      (option.city_name.toLowerCase().includes(filterValue) || option.IATA_code.toLowerCase().includes(filterValue))
    );
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

}
