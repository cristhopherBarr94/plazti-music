import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}
  async canActivate() {
    this.storage.create();
    const loginFlag = await this.storage.get('isUserLoggedIn');
    if (loginFlag) {
      return true;
    } else {
      this.router.navigate(['user']);
    }
  }
}
