import { Component, OnInit } from '@angular/core';
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
    private authService: AuthenticationService
  ) {}

  ngOnInit() {}

  closeMenu() {
    this.menu.close();
  }

  logOut() {
    this.authService.logOut();
  }
}
