import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { PassengerComponent } from './passenger.component';
import { FlightsComponent } from './flights/flights.component';

const routes: Routes = [
  {
    path: '',
    component: PassengerComponent
  },
  {
    path: 'flights/:searchQuery',
    component: FlightsComponent
  },
  {
    path: 'flight/:flightId',
    component: FlightsComponent
  },
  {
    path: 'flightbook/',
    component: FlightsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengerRoutingModule { }
