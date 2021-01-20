import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AuthService } from './shared/services/auth.service';
import { SnackbarService } from './shared/services/snackbar.service';
import { FlightFacadeService } from './store';
import { UserFacadeService } from './store/+state/users/user-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  unSubscribe = new Subject<void>();
  title = 'PackUrBags-Angular-Client';
  token = '';
  userType = 'passenger';
  googleAuth = false;

  constructor(
    private authService: AuthService,
    private snackBarService: SnackbarService,
    private router: Router,
    private flightFacadeService: FlightFacadeService,
    private userFacadeService: UserFacadeService
  ) { }

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    if (this.authService.getSessionItem('token')) {
      this.token = this.authService.getSessionItem('token');
      this.userFacadeService.getUserDetails(this.token);
      this.googleAuth = false;
    } else if (params.get('token')) {
      this.googleAuth = true;
      this.token = params.get('token');
      this.authService.setSessionItem('token', params.get('token'));
      window.location.replace(`${window.location.origin}/home`);
      this.userFacadeService.getUserDetails(this.token);
    } else {
      this.token = null;
    }
    this.userFacadeService.userDetails$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe(user => {
        this.userType = user.userType;
        if (this.authService.getSessionItem('isAdmin') === '' || this.authService.getSessionItem('isAdmin') !== `${(this.userType === 'admin')}`) {
          this.authService.setSessionItem('isAdmin', `${(this.userType === 'admin')}`);
        }
        if (this.authService.userIsAdmin()) {
          this.snackBarService.openSnackBar('Hi Admin, Navigating to Pack Ur Bags Portal.',
            'green-snackbar');
          this.router.navigate(['/admin/home']);
        }
      });
  }

  userLoggedIn(): boolean {
    if (this.authService.getSessionItem('token')) {
      return true;
    }
    return false;
  }
}
