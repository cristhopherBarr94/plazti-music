import { Component, OnInit } from '@angular/core';
import { Plugins } from '@Capacitor/core';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public imgURL: string = '';
  public photo: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  async takePhoto() {
    // funcion para tomar foto desde plugns capacitor
    // recibe como parametros calidad, habilitacion de edicion y el resultado de la imagen en el formato especificado se recomienda usar el formato DataURL
    // el ultimo parametro es source que permite indicar desde donde se cargará la foto (camera, galery , prompt)
    const image = await Plugins.Camera.getPhoto({
      quiality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    );
  }
}
