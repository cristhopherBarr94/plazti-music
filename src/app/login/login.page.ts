import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../utils/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public signInForm: FormGroup;

  private errorMessage: any = {
    email: 'Invalid email',
    password:
      'At least 8 characters in length, Lowercase letters, Uppercase letters, Numbers, Special characters',
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-zd$@$!%*?&.].{8,}'
        ),
      ]),
    });
  }

  login() {
    if (this.signInForm.invalid) {
      (<any>Object).values(this.signInForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }
    this.authService.login(this.signInForm.value);
  }

  public getMessageform(controlName: any): string {
    let error = '';
    const control = this.signInForm.get(controlName);
    if (control.touched && control.errors) {
      error = this.errorMessage[controlName];
    }
    return error;
  }
}
