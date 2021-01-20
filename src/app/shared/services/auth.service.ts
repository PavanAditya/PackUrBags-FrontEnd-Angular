import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { UserFacadeService } from 'src/app/store';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response.model';
import { EncryptService } from './encrypt.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private encryptService: EncryptService,
    private snackBarService: SnackbarService
  ) { }

  googleLogin(): void {
    window.location.href = `${this.BASE_URL}/passport/google`;
    return;
  }

  emailLogin(req: any): Observable<HttpResponse<Response>> {
    return this.http.post<HttpResponse<Response>>(
      `${this.BASE_URL}/auth/login/email`, req, { observe: 'response' as 'body' });
  }

  phNumLogin(req: any): Observable<HttpResponse<Response>> {
    return this.http.post<HttpResponse<Response>>(
      `${this.BASE_URL}/auth/login/phone`, req, { observe: 'response' as 'body' });
  }

  register(req: any): Observable<HttpResponse<Response>> {
    return this.http.post<HttpResponse<Response>>(
      `${this.BASE_URL}/auth/register`, req, { observe: 'response' as 'body' });
  }

  isUserAuthenticated(): boolean {
    if (this.getSessionItem('token')) {
      return true;
    }
    return false;
  }

  userIsAdmin(): boolean {
    return this.getSessionItem('isAdmin') === 'true';
  }

  public encrypt(word: string): string {
    return this.encryptService.set(word);
  }

  public decrypt(word: string): string {
    return this.encryptService.get(word);
  }

  public getSessionItem(key: string): string {
    if (localStorage.getItem(key)) {
      if (!this.decrypt(localStorage.getItem(key))) {
        localStorage.clear();
        this.snackBarService.openSnackBar('Unauthorised Accessed detected by Pack Ur Bags Admin. Please Login again',
          'red-snackbar');
        this.router.navigate(['/']);
      }
      return this.decrypt(localStorage.getItem(key));
    }
    return '';
  }
  // ? getting the required item from session storage after decryption

  // ? getting the required item from session storage after decryption
  public setSessionItem(key: string, value: string): void {
    localStorage.setItem(key, this.encrypt(value));
  }

  logout(token: string): Observable<HttpResponse<Response>> {
    let headers = new HttpHeaders();
    headers = headers
      .set('X-APPID', '48')
      .set('X-AUTOACK', '1')
      .set('PUB_AUTH', `PUB_TOKEN_BEARER ${token}`);
    localStorage.clear();
    return this.http.post<HttpResponse<Response>>(
      `${this.BASE_URL}/auth/logout`, {}, { headers, observe: 'response' as 'body' });
  }
}
