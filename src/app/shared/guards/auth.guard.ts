import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackbarService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authenticatedUser = this.authService.isUserAuthenticated();
    if (!authenticatedUser) {
      this.router.navigate(['/']);
      this.snackBarService.openSnackBar('Please Login to Pack Ur Bags and try accessing the given URL',
        'red-snackbar');
    }
    return authenticatedUser;
  }

}
