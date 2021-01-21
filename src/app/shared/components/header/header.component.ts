import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';

import { FlightFacadeService } from 'src/app/store';
import { UserFacadeService } from 'src/app/store';
import { UserDetailsModel } from '../../models/user-details.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  unSubscribe = new Subject<void>();
  user: UserDetailsModel;
  displayPicture = 'assets/images/profile-img.png';
  token = '';
  activateRoute = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private flightFacadeService: FlightFacadeService,
    private userFacadeService: UserFacadeService
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((navigationEnd: NavigationEnd) => {
        this.activateRoute = navigationEnd.url;
      });
  }

  ngOnInit(): void {
    if (this.authService.getSessionItem('token')) {
      this.token = this.authService.getSessionItem('token');
    }
    this.userFacadeService.userDetails$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe(user => {
        this.user = user;
        if (this.user.picture) {
          this.displayPicture = this.user.picture;
        }
      });
  }

  userLoggedIn(): boolean {
    if (this.authService.getSessionItem('token')) {
      return true;
    }
    return false;
  }

  logout(): void {
    this.authService.logout(this.token).subscribe(resp => {
      localStorage.clear();
      this.router.navigate(['/']);
    }, err => {
      localStorage.clear();
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

}
