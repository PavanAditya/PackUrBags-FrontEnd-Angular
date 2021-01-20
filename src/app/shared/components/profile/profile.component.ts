import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, finalize, takeUntil } from 'rxjs/operators';
import { UserFacadeService } from 'src/app/store';
import { UserDetailsModel } from '../../models/user-details.model';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  unSubscribe = new Subject<void>();
  displayPicture = 'assets/logos/pack-ur-bags-logo.png';
  downloadURL: Observable<string>;
  user: UserDetailsModel = null;
  lastUpdatedDateAndTime = '';
  editProfile = false;
  profileForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fireStorage: AngularFireStorage,
    private snackBarService: SnackbarService,
    private userFacadeService: UserFacadeService
  ) { }

  ngOnInit(): void {
    this.profileFormInit();
    this.userFacadeService.userDetails$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe(user => {
        this.user = user;
        if (user.picture) {
          this.displayPicture = user.picture;
        }
        if (user.lastUpdateDateTime) {
          this.lastUpdatedDateAndTime = `${user.lastUpdateDateTime.toDateString()} ${user.lastUpdateDateTime.toLocaleTimeString()}`;
        }
        if (user) {
          this.profileForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobileNumber: user.mobileNumber
          });
        }
      });
  }

  profileFormInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      mobileNumber: new FormControl('', [
        Validators.pattern(`^[0-9]{10}$`),
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.pattern(
          `^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$`
        ),
        Validators.required
      ])
    });
  }

  uploadProfilePic(event): void {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `profilePics/${n}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(`profilePics/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.displayPicture = url;
              this.snackBarService.openSnackBar('Profile Picture Uploaded Successfully.',
                'green-snackbar');
              this.user = {
                ...this.user,
                picture: this.displayPicture
              }
              this.userFacadeService.updateUserDetails(this.user, this.authService.getSessionItem('token'));
            }
          }, err => {
            this.snackBarService.openSnackBar('Profile Picture Uploaded Failed. Please try again.',
              'red-snackbar');
          });
        })
      )
      .subscribe(url => { });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      this.snackBarService.openSnackBar('Please Fil up the form correctly and Try again.',
        'red-snackbar');
    } else {
      const {
        firstName,
        lastName,
        mobileNumber,
        email
      } = this.profileForm.value;
      const user = {
        ...this.user,
        firstName,
        lastName,
        mobileNumber,
        email
      };
      this.userFacadeService.updateUserDetails(user, this.authService.getSessionItem('token'));
      this.editProfile = false;
    }
  }

  cancel(): void {
    this.editProfile = false;
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

}
