import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SnackbarService } from '../shared/services/snackbar.service';


@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    AuthRoutingModule,
    SharedModule,
  ]
})
export class AuthModule { }
