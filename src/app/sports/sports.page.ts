import { Component, OnDestroy } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Subscription } from 'rxjs';
import { PlatziMusicService } from '../utils/services/platzi-music.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.page.html',
  styleUrls: ['./sports.page.scss'],
})
export class SportsPage implements OnDestroy {
  private searchSubs: Subscription;

  public currentCenter: any = {};
  public coordinates: any[] = [];
  public defaultZoom: number = 14;
  public currentTrack: HTMLAudioElement;
  public songSelected: any;

  public items: any[] = [];

  constructor(private musicService: PlatziMusicService) {}

  ionViewDidEnter() {
    this.getCurrentPos();
    this.watchPosition();
  }

  async getCurrentPos() {
    if (Geolocation) {
      const coordinates = await Geolocation.getCurrentPosition();
      this.currentCenter = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      };
    }
  }

  watchPosition() {
    if (Geolocation) {
      Geolocation.watchPosition({}, (position) => {
        this.currentCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.coordinates.push(this.currentCenter);
      });
    }
  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      if (val.length > 3) {
        this.searchSubs = this.musicService.songsBySearch$.subscribe(
          (tracksFinded) => {
            if (tracksFinded) {
              tracksFinded.playing = false;
              this.items = tracksFinded.filter((track) => track.preview_url);
            }
          }
        );

        this.musicService.searchTracks(val);
      }
    }
  }

  play(value: any) {
    if (this.currentTrack) {
      this.stop(this.songSelected);
    }
    this.songSelected = value;
    this.songSelected.playing = true;
    this.currentTrack = new Audio(this.songSelected.preview_url);
    this.currentTrack.play();

    this.currentTrack.addEventListener(
      'ended',
      () => (this.songSelected.playing = false)
    );
  }

  stop(value: any) {
    this.currentTrack.pause();
    this.songSelected.playing = false;
  }

  ngOnDestroy() {
    this.searchSubs.unsubscribe();
  }
}
