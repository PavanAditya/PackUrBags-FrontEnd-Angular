import { Component, OnInit } from '@angular/core';
import { AuthFacadeService } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PackUrBags-Angular-Client';
  token = '';

  constructor(
    private authFacadeService: AuthFacadeService
  ) {}

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.authFacadeService.getUserDetails(this.token);
    } else if (params.get('token')) {
      this.token = params.get('token');
      localStorage.setItem('token', params.get('token'));
      window.location.replace(`${window.location.origin}/home`);
      this.authFacadeService.getUserDetails(this.token);
    } else {
      this.token = null;
    }
  }

  userLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
