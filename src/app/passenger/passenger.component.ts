import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { FlightFacadeService, UserFacadeService } from '../store';
import { airportsList } from '../shared/mocks/airports.mock';
import { offersList } from '../shared/mocks/offers-list.mock';
import { Airport } from '../shared/models/airport.model';
import { UserDetailsModel } from '../shared/models/user-details.model';
import { OfferDetailsSheetComponent } from './offer-details-sheet/offer-details-sheet.component';
import { OfferDetails } from '../shared/models/offer-details.model';
import { Router } from '@angular/router';

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
  searchQuery = {};
  panelOpenState = false;
  offers = offersList;
  filteredFromAirportsList: Observable<Airport[]>;
  filteredToAirportsList: Observable<Airport[]>;
  fromAirportsList: Airport[] = airportsList;
  toAirportsList: Airport[] = airportsList;

  constructor(
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private userFacadeService: UserFacadeService,
    private flightFacadeService: FlightFacadeService,
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

  displayValue(airportCode: string): string {
    const airport: Airport = this.fromAirportsList.find(el => el.IATA_code === airportCode);
    return airport ? `${airport.city_name} (${airport.IATA_code})` : '';
  }

  searchFlights(): void {
    this.searchQuery = {
      ...this.searchQuery,
      from: this.from.value.IATA_code,
      to: this.to.value.IATA_code,
      fromDate: this.fromDate.value,
      toDate: this.toDate.value,
      adults: this.adults,
      children: this.children,
    };
    if (this.activeTab === 'one-way') {
      delete this.searchQuery[`toDate`];
    }
    this.router.navigate(['flights', JSON.stringify(this.searchQuery)]);
  }

  drop(event: CdkDragDrop<OfferDetails[]>): void {
    console.log(event);
    moveItemInArray(this.offers, event.previousIndex, event.currentIndex);
  }

  openChipSheet(chipDetails: OfferDetails): void {
    this.bottomSheet.open(OfferDetailsSheetComponent, {
      data: chipDetails
    });
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
