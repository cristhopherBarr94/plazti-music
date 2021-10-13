import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class OnboardingGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}
  async canActivate() {
    this.storage.create();
    const introFlag = await this.storage.get('isIntroViewed');
    if (introFlag) {
      return true;
    } else {
      this.router.navigate(['onboarding']);
    }
  }
}
