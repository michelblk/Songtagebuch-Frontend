import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { SearchResultComponent } from '../search-result/search-result.component';
import { Song } from '../../../api/model/song';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { SongService } from '../../../api/service/song.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchResultComponent, NgForOf, AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnDestroy {
  destroyNotifier$: Subject<void> = new Subject<void>();
  searchResults$: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>([]);
  @Output()
  selectedSong: EventEmitter<Song> = new EventEmitter<Song>();

  constructor(private songService: SongService) {}

  ngOnDestroy() {
    this.destroyNotifier$.next();
  }

  search(event: any) {
    this.performSearch(event.target.value); // todo rate limit
  }

  performSearch(query: string) {
    if (query.trim().length == 0) {
      this.searchResults$.next([]);
    }

    this.songService
      .search(query)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (suggestions: Song[]) => {
          this.searchResults$.next(suggestions);
        },
        error: () => {
          this.searchResults$.next([]);
        },
      });
  }

  selectSong(song: Song) {
    this.searchResults$.next([]);
    this.selectedSong.emit(song);
  }
}
