import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from './http.service';
import * as dataArtists from '../json/artists.json';

@Injectable({
  providedIn: 'root',
})
export class PlatziMusicService {
  private _platziMusic: any[] = [];
  private _songsByArt: any[] = [];
  private _songsByAlbm: any[] = [];

  private _platziMusicSbj = new Subject<any>();
  private _songsByArtSbj = new Subject<any>();
  private _songsByAlbmSbj = new Subject<any>();

  public musicList$ = this._platziMusicSbj.asObservable();
  public songsByArt$ = this._songsByArtSbj.asObservable();
  public songsByAlbm$ = this._songsByAlbmSbj.asObservable();

  constructor(private httpService: HttpService) {}

  getArtistList() {
    return dataArtists;
  }

  getNewReleases() {
    this.httpService
      .get('https://platzi-music-api.herokuapp.com/browse/new-releases')
      .subscribe((res: any) => {
        if (res.status === 200) {
          this._platziMusic = [];
          res.body.albums.items.forEach((item) => {
            this._platziMusic.push(item);
          });
          this._platziMusicSbj.next(this._platziMusic);
        }
      });
  }

  getSognsByArtist(artistId: string) {
    this.httpService
      .get(
        `https://platzi-music-api.herokuapp.com/artists/${artistId}/top-tracks?country=CO`
      )
      .subscribe((res: any) => {
        if (res.status === 200) {
          this._songsByArt = [];
          res.body.tracks.forEach((item) => {
            this._songsByArt.push(item);
          });
          this._songsByArtSbj.next(this._songsByArt);
        }
      });
  }

  getSongsByAlbum(albumId: string) {
    this.httpService
      .get(
        `https://platzi-music-api.herokuapp.com/albums/${albumId}/tracks?country=CO`
      )
      .subscribe((res: any) => {
        if (res.status === 200) {
          this._songsByAlbm = [];
          res.body.items.forEach((item) => {
            this._songsByAlbm.push(item);
          });
          this._songsByAlbmSbj.next(this._songsByAlbm);
        }
      });
  }
}
