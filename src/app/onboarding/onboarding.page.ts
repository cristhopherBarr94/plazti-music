import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage {
  private isIntroViewed: boolean = false;
  public btnDisabled = true;
  slideOpts = {
    initialSlide: 0,
    speed: 300,
  };
  slidesContent = [
    {
      imgURL1x: 'assets/img/slide1_listen1x.png',
      imgURL2x: 'assets/img/slide1_listen2x.png',
      title: 'Escucha tu musica',
      subtitle: 'EN CUALQUIER LUGAR',
      description:
        'Los mejores albumes, las mejores canciones. Escucha y comparte en cualquier comento, a todas horas.',
    },
    {
      imgURL1x: 'assets/img/slide2_enjoy1x.png',
      imgURL2x: 'assets/img/slide2_enjoy2x.png',
      title: 'Disfruta de lo que màs te gusta',
      subtitle: 'SIN RESTRICCIONES',
      description:
        'Los mejores albumes, las mejores canciones. Escucha y comparte en cualquier comento, a todas horas.',
    },
    {
      imgURL1x: 'assets/img/slide3_everyone1x.png',
      imgURL2x: 'assets/img/slide3_everyone2x.png',
      title: 'Disfruta y comparte',
      subtitle: 'SIN IMPORTAR NADA!',
      description:
        'Los mejores albumes, las mejores canciones. Escucha y comparte en cualquier comento, a todas horas.',
    },
  ];
  constructor(private router: Router, private storage: Storage) {}

  closeSlides() {
    this.isIntroViewed = true;
    this.storage.create();
    this.storage.set('isIntroViewed', true);
    this.router.navigate(['home']);
  }
}
