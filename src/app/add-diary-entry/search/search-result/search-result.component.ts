import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Song } from '../../../api/model/song';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent implements OnInit, OnDestroy {
  @Input()
  song!: Song;
  previewPlayback: HTMLAudioElement | null = null;

  ngOnInit() {
    if (this.song.previewUrl) {
      this.previewPlayback = new Audio(this.song.previewUrl);
    }
  }

  ngOnDestroy() {
    this.previewPlayback?.pause();
  }

  togglePreviewPlayback() {
    if (!this.previewPlayback?.currentTime || this.previewPlayback?.paused) {
      this.previewPlayback?.play();
    } else {
      this.previewPlayback?.pause();
    }
  }
}
