import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmailLogin } from 'src/app/shared/models/email-login.model';
import { PhoneLogin } from 'src/app/shared/models/phone-login.model';
import { Register } from 'src/app/shared/models/regiser.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserFacadeService } from 'src/app/store';

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
  emailLogin: EmailLogin = {
    email: '',
    password: ''
  };
  phoneLogin: PhoneLogin = {
    mobileNumber: '',
    password: ''
  };
  registerReq: Register = {
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: ''
  };
  signInForm: FormGroup;
  signUpForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userFacadeService: UserFacadeService,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.signInFormInit();
    this.signUpFormInit();
  }

  signInFormInit(): void {
    this.signInForm = new FormGroup({
      loginId: new FormControl('', [
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
      mobile: new FormControl('', [
        Validators.pattern(`^[0-9]{10}$`),
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
      const emailRegEx = new RegExp(`^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$`);
      const phNumRegEx = new RegExp(`^[0-9]{10}$`);
      if (emailRegEx.test(this.signInForm.value.loginId)) {
        const {
          loginId,
          password
        } = this.signInForm.value;
        this.emailLogin = {
          email: loginId,
          password
        };
        this.authService.emailLogin(this.emailLogin).subscribe(resp => {
          this.snackBarService.openSnackBar(
            'Welcome To Pack Ur Bags',
            'green-snackbar'
          );
          this.authService.setSessionItem('token', resp.body.dataObject.data.sessionToken);
          this.userFacadeService.getUserDetails(resp.body.dataObject.data.sessionToken);
          this.router.navigate(['/home']);
        }, err => {
          this.snackBarService.openSnackBar(
            `Login Failed. Please try again`,
            'red-snackbar'
          );
        });
      } else if (phNumRegEx.test(this.signInForm.value.loginId)) {
        const {
          loginId,
          password
        } = this.signInForm.value;
        this.phoneLogin = {
          mobileNumber: loginId,
          password
        };
        this.authService.phNumLogin(this.phoneLogin).subscribe(resp => {
          this.snackBarService.openSnackBar(
            'Welcome To Pack Ur Bags',
            'green-snackbar'
          );
          this.authService.setSessionItem('token', resp.body.dataObject.data.sessionToken);
          this.userFacadeService.getUserDetails(resp.body.dataObject.data.sessionToken);
          this.router.navigate(['/home']);
        }, err => {
          this.snackBarService.openSnackBar(
            `Login Failed. Please try again`,
            'red-snackbar'
          );
        });
      }
    }
  }

  signUpValidation(): void {
    if (this.signUpForm.invalid) {
      this.snackBarService.openSnackBar(
        'Fill Up all the Fields',
        'red-snackbar'
      );
    } else {
      const {
        password,
        firstName,
        lastName,
        mobile,
        email
      } = this.signUpForm.value;
      this.registerReq = {
        password,
        confirmPassword: password,
        firstName,
        lastName,
        mobileNumber: mobile,
        email
      };
      this.authService.register(this.registerReq).subscribe(resp => {
        if (resp.body.status === 200 || resp.body.status === 203) {
          this.snackBarService.openSnackBar(
            `Hi ${resp.body.dataObject.data.firstName ? resp.body.dataObject.data.firstName : ''}. You're registered To Pack Ur Bags.`,
            'green-snackbar'
          );
          this.signUpFormInit();
          this.activeForm = 'login';
        } else {
          if (resp.body.status === 403) {
            this.snackBarService.openSnackBar(
              resp.body.dataObject.data,
              'red-snackbar'
            );
          } else {
            this.snackBarService.openSnackBar(
              `Registration Failed. Please try again`,
              'red-snackbar'
            );
          }
        }
      }, err => {
        if (err.status === 403) {
          this.snackBarService.openSnackBar(
            err.error.dataObject.data,
            'red-snackbar'
          );
        } else {
          this.snackBarService.openSnackBar(
            `Registration Failed. Please try again`,
            'red-snackbar'
          );
        }
      });
    }
  }

  signInWithGoogle(): void {
    this.authService.googleLogin();
  }

  forgotPassword(): void {
    this.snackBarService.openSnackBar(
      'Forgot Password Yet to be added',
      'green-snackbar'
    );
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
