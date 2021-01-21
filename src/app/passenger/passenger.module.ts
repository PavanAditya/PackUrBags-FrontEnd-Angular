import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengerRoutingModule } from './passenger-routing.module';
import { PassengerComponent } from './passenger.component';
import { SharedModule } from '../shared/shared.module';
import { OfferDetailsSheetComponent } from './offer-details-sheet/offer-details-sheet.component';
import { MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { FlightsComponent } from './flights/flights.component';
import { FlightSeatLayoutComponent } from './flight-seat-layout/flight-seat-layout.component';
import { FlightBookingComponent } from './flight-booking/flight-booking.component';


@NgModule({
  declarations: [PassengerComponent, OfferDetailsSheetComponent, FlightsComponent, FlightSeatLayoutComponent, FlightBookingComponent],
  imports: [
    CommonModule,
    PassengerRoutingModule,
    SharedModule
  ],
  entryComponents: [
    OfferDetailsSheetComponent
  ],
  providers: [
    { provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ]
})
export class PassengerModule { }
