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
  @Input() element_id: string = '';
  @Input() element_name: string = '';
  @Input() operator: string = '';

  private songsByElTypeSubs: Subscription;
  public songs: any[] = [];

  constructor(
    private musicService: PlatziMusicService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getSongsList(this.element_id);
  }

  getSongsList(elementInput: any) {
    if (this.operator) {
      this.songsByElTypeSubs = this.musicService.songsByAlbm$.subscribe(
        (songsData) => {
          if (songsData) {
            this.songs = songsData;
          } else {
            // TODO logic for error (snackbar)
          }
        }
      );
      this.musicService.getSongsByAlbum(elementInput);
      return;
    }

    this.songsByElTypeSubs = this.musicService.songsByArt$.subscribe(
      (songsData) => {
        if (songsData) {
          this.songs = songsData;
        } else {
          // TODO logic for error (snackbar)
        }
      }
    );
    this.musicService.getSognsByArtist(elementInput);
  }

  async selectSong(track?: any) {
    (await track)
      ? this.modalController.dismiss(track)
      : this.modalController.dismiss();
  }

  ngOnDestroy() {
    this.songsByElTypeSubs.unsubscribe();
  }
}
