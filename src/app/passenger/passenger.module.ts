import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengerRoutingModule } from './passenger-routing.module';
import { PassengerComponent } from './passenger.component';
import { SharedModule } from '../shared/shared.module';
import { OfferDetailsSheetComponent } from './offer-details-sheet/offer-details-sheet.component';
import { MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';


@NgModule({
  declarations: [PassengerComponent, OfferDetailsSheetComponent],
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
