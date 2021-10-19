import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './utils/guards/login.guard';
import { OnboardingGuard } from './utils/guards/onboarding.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'onboarding',
    loadChildren: () =>
      import('./onboarding/onboarding.module').then(
        (m) => m.OnboardingPageModule
      ),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./user/pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./user/pages/signup/signup.module').then(
        (m) => m.SignupPageModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./menu/menu.module').then((m) => m.MenuPageModule),
    canActivate: [LoginGuard, OnboardingGuard],
  },
  {
    path: 'songs-modal',
    loadChildren: () =>
      import('./songs-modal/songs-modal.module').then(
        (m) => m.SongsModalPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
