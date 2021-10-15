import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PlatziMusicService } from '../utils/services/platzi-music.service';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage implements OnInit, OnDestroy {
  @Input() artistId: string = '';
  @Input() artist_name: string = '';

  private songsByArtistSubs: Subscription;
  public songs: any[] = [];

  constructor(
    private musicService: PlatziMusicService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getSongsList(this.artistId);
  }

  getSongsList(artist: any) {
    this.songsByArtistSubs = this.musicService.songsByArt$.subscribe(
      (songsData) => {
        if (songsData) {
          this.songs = songsData;
        } else {
          // TODO logic for error (snackbar)
        }
      }
    );
    this.musicService.getSognsByArtist(artist);
  }

  async selectSong(track: any) {
    await this.modalController.dismiss(track);
  }

  ngOnDestroy() {
    this.songsByArtistSubs.unsubscribe();
  }
}
