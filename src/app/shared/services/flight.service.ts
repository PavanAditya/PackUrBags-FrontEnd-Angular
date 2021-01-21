import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private BASE_URL = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public searchFlights(searchQuery: string): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(
      `${this.BASE_URL}/flights/search/${searchQuery}`, { observe: 'response' as 'body' });
  }
}
