import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { DiaryEntry } from '../api/model/diary-entry';

@Component({
  selector: 'app-diary-entry',
  standalone: true,
  imports: [NgForOf, DatePipe, NgIf],
  templateUrl: './diary-entry.component.html',
  styleUrl: './diary-entry.component.scss',
})
export class DiaryEntryComponent implements OnInit, OnDestroy {
  @Input()
  entry!: DiaryEntry;
  previewPlayback: HTMLAudioElement | null = null;

  ngOnInit() {
    if (this.entry.songs[0].previewUrl) {
      // TODO support multiple songs
      this.previewPlayback = new Audio(this.entry.songs[0].previewUrl);
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
