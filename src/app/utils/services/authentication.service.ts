import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public isAuth: boolean = true;
  constructor() {}

  getAuthState() {
    return this.isAuth;
  }

  login(credentials) {}
}
