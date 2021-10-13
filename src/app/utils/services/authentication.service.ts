import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public isAuth: boolean = false;
  constructor(private storage: Storage, private router: Router) {}

  getAuthState() {
    return this.isAuth;
  }

  login(credentials) {
    if (
      credentials.email == 'crisbarsa@gmail.com' &&
      credentials.password == 'Salamanca1.'
    ) {
      this.storage.create();
      this.storage.set('isUserLoggedIn', true);
      this.router.navigate(['home']);
    }
  }
}
