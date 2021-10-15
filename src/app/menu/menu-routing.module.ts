import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'player',
        loadChildren: () =>
          import('./../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'sports',
        loadChildren: () =>
          import('./../home/home.module').then((m) => m.HomePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
