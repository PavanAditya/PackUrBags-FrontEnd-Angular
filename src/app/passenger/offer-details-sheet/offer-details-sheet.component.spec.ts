import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDetailsSheetComponent } from './offer-details-sheet.component';

describe('OfferDetailsSheetComponent', () => {
  let component: OfferDetailsSheetComponent;
  let fixture: ComponentFixture<OfferDetailsSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferDetailsSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDetailsSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
