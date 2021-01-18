import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { AuthFacadeService } from 'src/app/store';
import { UserDetailsModel } from '../models/user-details.model';
import { AuthService } from '../services/auth.service';

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private authFacadeService: AuthFacadeService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
    this.authFacadeService.userDetails$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe(user => {
        this.user = user;
        if (this.user.picture) {
          this.displayPicture = this.user.picture;
        }
      });
  }

  userLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  logout(): void {
    this.authService.logout(this.token).subscribe(resp => {
      localStorage.clear();
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

}
