import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FlightReducer } from './+state/flights/flight.reducer';
import { FlightEffects } from './+state/flights/flight.effects';
import { UserEffects } from './+state/users/user.effects';
import { UserReducer } from './+state/users/user.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('flight', FlightReducer),
    StoreModule.forFeature('user', UserReducer),
    EffectsModule.forFeature([
      FlightEffects,
      UserEffects
    ]),
  ]
})
export class AppStoreModule { }
