import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { UserDetailsModel } from '../shared/models/user-details.model';
import { AuthFacadeService } from '../store';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {

  unSubscribe = new Subject<void>();
  user: UserDetailsModel;

  constructor(
    private authFacadeService: AuthFacadeService
  ) { }

  ngOnInit(): void {
    this.authFacadeService.userDetails$
    .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
    .subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

}
