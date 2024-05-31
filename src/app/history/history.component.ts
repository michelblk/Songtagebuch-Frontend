import { Component, OnInit } from '@angular/core';
import { DiaryEntryComponent } from '../diary-entry/diary-entry.component';
import { DiaryEntry } from '../api/model/diary-entry';
import { DiaryEntryService } from '../api/service/diary-entry.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { AddDiaryEntryComponent } from '../add-diary-entry/add-diary-entry.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DiaryEntryComponent, AsyncPipe, NgForOf, AddDiaryEntryComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  public diaryEntries$!: Observable<DiaryEntry[]>;

  constructor(
    private diaryEntryService: DiaryEntryService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.diaryEntries$ =
      this.diaryEntryService.getDiaryEntriesFromUserOfPastDays(
        this.authService.user$.getValue()?.id || '',
        new Date(),
        30,
      );
  }
}
