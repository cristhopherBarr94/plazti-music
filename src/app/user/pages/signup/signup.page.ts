import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/utils/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public signUpForm: FormGroup;

  private errorMessage: any = {
    first_name: 'At least 8 and max 50 characters in length',
    last_name: 'At least 8 and max 50 characters in length',
    email: 'Invalid email',
    password:
      'At least 8 characters in length, Lowercase letters, Uppercase letters, Numbers, Special characters',
    gender: 'Select your gender',
    country: 'Select your country',
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
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
      country: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
  }

  register() {
    if (this.signUpForm.invalid) {
      (<any>Object).values(this.signUpForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }
    this.authService.login(this.signUpForm.value);
  }

  public getMessageform(controlName: any): string {
    let error = '';
    const control = this.signUpForm.get(controlName);
    if (control.touched && control.errors) {
      error = this.errorMessage[controlName];
    }
    return error;
  }

  prevPage() {
    this.router.navigate(['/login']);
  }
}
