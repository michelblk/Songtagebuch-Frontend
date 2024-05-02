import { Component, OnDestroy, OnInit } from '@angular/core';
import { Song } from '../api/model/song';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { DiaryEntryService } from '../api/service/diary-entry.service';
import { DiaryEntry } from '../api/model/diary-entry';
import { AuthService } from '../auth/auth.service';
import { SearchComponent } from './search/search/search.component';

@Component({
  selector: 'app-add-diary-entry',
  standalone: true,
  imports: [NgForOf, NgIf, AsyncPipe, SearchComponent],
  templateUrl: './add-diary-entry.component.html',
  styleUrl: './add-diary-entry.component.scss',
})
export class AddDiaryEntryComponent implements OnInit, OnDestroy {
  private destroyNotifier$!: Subject<void>;

  constructor(
    private diaryEntryService: DiaryEntryService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.destroyNotifier$ = new Subject<void>();
  }

  ngOnDestroy() {
    this.destroyNotifier$.next();
  }

  selectSong(song: Song) {
    console.log(song);
    this.submit(song);
  }

  submit(song: Song) {
    const entry: DiaryEntry = new DiaryEntry(
      null,
      new Date(),
      null,
      [song],
      '',
    );

    this.diaryEntryService
      .add(this.authService.user$.getValue()?.id || '', entry)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((success) => {
        location.reload(); // TODO add result to dashboard
      });
  }
}
