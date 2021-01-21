import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSeatLayoutComponent } from './flight-seat-layout.component';

describe('FlightSeatLayoutComponent', () => {
  let component: FlightSeatLayoutComponent;
  let fixture: ComponentFixture<FlightSeatLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightSeatLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSeatLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
