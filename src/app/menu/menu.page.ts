import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from '../utils/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  constructor(
    private menu: MenuController,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  closeMenu() {
    this.menu.close();
  }

  goTo(route: string) {
    this.router.navigate([route]);
    this.closeMenu();
  }

  logOut() {
    this.authService.logOut();
  }
}
