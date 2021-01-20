import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengerRoutingModule } from './passenger-routing.module';
import { PassengerComponent } from './passenger.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PassengerComponent],
  imports: [
    CommonModule,
    PassengerRoutingModule,
    SharedModule
  ]
})
export class PassengerModule { }
