import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthReducer } from './+state/auth/auth.reducer';
import { AuthEffects } from './+state/auth/auth.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', AuthReducer),
    EffectsModule.forFeature([
      AuthEffects
    ]),
  ]
})
export class AppStoreModule { }
