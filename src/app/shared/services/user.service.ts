import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetsRespModel } from 'src/app/store/+state/flights/flight-helper';
import { environment } from 'src/environments/environment';
import { UserDetailsModel } from '../models/user-details.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public userData(token: string): Observable<HttpResponse<UserDetsRespModel>> {
    let headers = new HttpHeaders();
    headers = headers
      .set('X-APPID', '48')
      .set('X-AUTOACK', '1')
      .set('PUB_AUTH', `PUB_TOKEN_BEARER ${token}`);
    return this.http.get<HttpResponse<UserDetsRespModel>>(
      `${this.BASE_URL}/users/one`, { headers, observe: 'response' as 'body' });
  }

  public updateUserData(req: UserDetailsModel, token: string): Observable<HttpResponse<UserDetsRespModel>> {
    let headers = new HttpHeaders();
    headers = headers
      .set('X-APPID', '48')
      .set('X-AUTOACK', '1')
      .set('PUB_AUTH', `PUB_TOKEN_BEARER ${token}`);
    return this.http.put<HttpResponse<UserDetsRespModel>>(
      `${this.BASE_URL}/users/update`, req, { headers, observe: 'response' as 'body' });
  }
}
