import { Component, OnDestroy, OnInit } from '@angular/core';
import { Song } from '../api/model/song';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { SongService } from '../api/service/song.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { DiaryEntryService } from '../api/service/diary-entry.service';
import { DiaryEntry } from '../api/model/diary-entry';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add-diary-entry',
  standalone: true,
  imports: [NgForOf, NgIf, AsyncPipe],
  templateUrl: './add-diary-entry.component.html',
  styleUrl: './add-diary-entry.component.scss',
})
export class AddDiaryEntryComponent implements OnInit, OnDestroy {
  public selectedSongs: Song[] = [];
  public suggestions: Song[] = [];
  private destroyNotifier$!: Subject<void>;
  private searchRequestOngoing$!: BehaviorSubject<boolean>;

  constructor(
    private songService: SongService,
    private diaryEntryService: DiaryEntryService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.destroyNotifier$ = new Subject<void>();
    this.searchRequestOngoing$ = new BehaviorSubject<boolean>(false);
    this.selectedSongs = [new Song()];
  }

  ngOnDestroy() {
    this.destroyNotifier$.next();
  }

  loadSuggestions(event: any, song: Partial<Song>) {
    if (this.searchRequestOngoing$.getValue()) {
      return;
    } // TODO better rate limiting

    this.searchRequestOngoing$.next(true);
    this.songService
      .search(event.target.value)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((suggestions: Song[]) => {
        this.searchRequestOngoing$.next(false);
        this.suggestions = suggestions;
      });
  }

  useSuggestion(suggestion: Song, selectedSong: Song) {
    const index = this.selectedSongs.indexOf(selectedSong, 0); // move to own subcomponent -> own variable
    this.selectedSongs[index] = suggestion;
    this.suggestions = [];
  }

  addAnotherSong() {
    this.selectedSongs.push(new Song());
  }

  removeSong(song: Song) {
    const index = this.selectedSongs.indexOf(song, 0);
    if (index > -1) {
      this.selectedSongs.splice(index, 1);
    }
  }

  submit() {
    const entry: DiaryEntry = new DiaryEntry(
      null,
      new Date(),
      null,
      this.selectedSongs.filter((s) => s.id || s.spotifyId),
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
