import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackbarService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.userIsAdmin()) {
      return true;
    } else if (this.authService.isUserAuthenticated()) {
      this.snackBarService.openSnackBar('Only Pack Ur Bags Admin can access the given URL',
        'red-snackbar');
      this.router.navigate(['/home']);
      return false;
    } else {
      this.snackBarService.openSnackBar('Only Pack Ur Bags Admin can access the given URL',
        'red-snackbar');
      this.router.navigate(['/']);
      return false;
    }
  }
}
