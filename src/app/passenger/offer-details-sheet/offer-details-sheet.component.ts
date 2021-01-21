import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { OfferDetails } from 'src/app/shared/models/offer-details.model';

@Component({
  selector: 'app-offer-details-sheet',
  templateUrl: './offer-details-sheet.component.html',
  styleUrls: ['./offer-details-sheet.component.scss']
})
export class OfferDetailsSheetComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: OfferDetails,
    private bottomSheetRef: MatBottomSheetRef<OfferDetailsSheetComponent>
  ) { }

  ngOnInit(): void {
  }

  openLink(): void {
    this.bottomSheetRef.dismiss();
  }

}
