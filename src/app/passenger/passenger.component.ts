import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import { airportsList } from '../shared/mocks/airports.mock';
import { offersList } from '../shared/mocks/offers-list.mock';
import { Airport } from '../shared/models/airport.model';
import { UserDetailsModel } from '../shared/models/user-details.model';
import { FlightFacadeService, UserFacadeService } from '../store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PassengerComponent implements OnInit, OnDestroy {

  unSubscribe = new Subject<void>();
  user: UserDetailsModel;
  activeTab = 'one-way';
  from = new FormControl('');
  to = new FormControl('');
  fromDate = new FormControl('');
  toDate = new FormControl('');
  adults = '1';
  children = '0';
  panelOpenState = false;
  offers = offersList;
  filteredFromAirportsList: Observable<Airport[]>;
  filteredToAirportsList: Observable<Airport[]>;
  fromAirportsList: Airport[] = airportsList;
  toAirportsList: Airport[] = airportsList;

  constructor(
    private flightFacadeService: FlightFacadeService,
    private userFacadeService: UserFacadeService
  ) { }

  ngOnInit(): void {
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

  displayValue(airport: Airport): string {
    return airport ? `${airport.city_name} (${airport.IATA_code})` : '';
  }

  searchFlights(): void {
    console.log('from', this.from.value);
    console.log('to', this.to.value);
    console.log('fromDate', this.fromDate.value);
    console.log('toDate', this.toDate.value);
    console.log('adults', this.adults);
    console.log('children', this.children);
  }

  drop(event: CdkDragDrop<{ url: string; name: string; desc: string }[]>): void {
    console.log(event);
    moveItemInArray(this.offers, event.previousIndex, event.currentIndex);
  }

  private filterFromCities(value: string): Airport[] {
    const filterValue = (typeof value === 'string') ? value.toLowerCase() : this.from.value.IATA_code;
    return this.fromAirportsList.filter(option =>
      (option.city_name.toLowerCase().includes(filterValue) || option.IATA_code.toLowerCase().includes(filterValue))
    );
  }

  private filterToCities(value: string): Airport[] {
    const filterValue = (typeof value === 'string') ? value.toLowerCase() : this.to.value.IATA_code;
    return this.toAirportsList.filter(option =>
      (option.city_name.toLowerCase().includes(filterValue) || option.IATA_code.toLowerCase().includes(filterValue))
    );
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

}
