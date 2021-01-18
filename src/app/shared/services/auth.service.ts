import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetsRespModel } from 'src/app/store/+state/auth/auth-helper';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response.model';
import { UserDetailsModel } from '../models/user-details.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public googleLogin(): void {
    window.location.href = `${this.BASE_URL}/passport/google`;
    return;
  }

  public userData(token: string): Observable<HttpResponse<UserDetsRespModel>> {
    let headers = new HttpHeaders();
    headers = headers
      .set('X-APPID', '48')
      .set('X-AUTOACK', '1')
      .set('PUB_AUTH', `PUB_TOKEN_BEARER ${token}`);
    return this.http.get<HttpResponse<UserDetsRespModel>>(
      `${this.BASE_URL}/users/one`, { headers, observe: 'response' as 'body' });
  }

  public logout(token: string): Observable<HttpResponse<Response>> {
    let headers = new HttpHeaders();
    headers = headers
      .set('X-APPID', '48')
      .set('X-AUTOACK', '1')
      .set('PUB_AUTH', `PUB_TOKEN_BEARER ${token}`);
    return this.http.post<HttpResponse<Response>>(
      `${this.BASE_URL}/auth/logout`, {}, { headers, observe: 'response' as 'body' });
  }
}
