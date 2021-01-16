import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  passwordHint = `Min 8 characters, 1 uppercase, 1 Special Character, 1 digit`;
  typeSignInIcon = 'password';
  typeSignUpIcon = 'password';
  activeForm = 'login';
  hideSignInIcon = true;
  hideSignUpIcon = true;
  buttonSignInSpinner = false;
  buttonSignUpSpinner = false;
  signInForm: FormGroup;
  signUpForm: FormGroup;

  constructor(
    private router: Router,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.signInFormInit();
    this.signUpFormInit();
  }

  signInFormInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [
        Validators.pattern(
          `^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$`
        ),
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.pattern(
          `^(?=.*[A-Z])(?=.*[!@#$&*\^%\*\.])(?=.*[0-9])(?=.*[a-z]).{8,32}$`
        ),
        Validators.required
      ])
    });
  }

  signUpFormInit(): void {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.pattern(
          `^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$`
        ),
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.pattern(
          `^(?=.*[A-Z])(?=.*[!@#$&*\^%\*\.])(?=.*[0-9])(?=.*[a-z]).{8,32}$`
        ),
        Validators.required
      ])
    });
  }

  signInValidation(): void {
    if (this.signInForm.invalid) {
      this.snackBarService.openSnackBar(
        'Fill Up all the Fields',
        'red-snackbar'
      );
    } else {
      this.snackBarService.openSnackBar(
        'Welcome To Pack Ur Bags',
        'green-snackbar'
      );
    }
  }

  signUpValidation(): void {
    if (this.signUpForm.invalid) {
      this.snackBarService.openSnackBar(
        'Fill Up all the Fields',
        'red-snackbar'
      );
    } else {
      this.snackBarService.openSnackBar(
        'Registered To Pack Ur Bags',
        'green-snackbar'
      );
    }
  }

  signInWithGoogle(): void {
    this.snackBarService.openSnackBar(
      'Google Sign In Successful to Pack Ur Bags',
      'green-snackbar'
    );
  }

  forgotPassword(): void {
    this.routerNavigate('/forgotpassword');
  }

  activateSignInSpinner(): void {
    if (this.signInForm.valid) {
      this.buttonSignInSpinner = true;
    }
  }

  activateSignUpSpinner(): void {
    if (this.signUpForm.valid) {
      this.buttonSignUpSpinner = true;
    }
  }

  visibilitySignInIcon(): void {
    this.hideSignInIcon = !this.hideSignInIcon;
    if (this.hideSignInIcon) {
      this.typeSignInIcon = 'password';
    } else {
      this.typeSignInIcon = 'text';
    }
  }

  visibilitySignUpIcon(): void {
    this.hideSignUpIcon = !this.hideSignUpIcon;
    if (this.hideSignUpIcon) {
      this.typeSignUpIcon = 'password';
    } else {
      this.typeSignUpIcon = 'text';
    }
  }

  routerNavigate(url: string): void {
    this.router.navigate([url]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
