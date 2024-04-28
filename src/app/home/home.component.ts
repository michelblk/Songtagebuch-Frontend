import { Component, OnInit } from '@angular/core';
import { DiaryEntryComponent } from '../diary-entry/diary-entry.component';
import { DiaryEntry } from '../api/model/diary-entry';
import { DiaryEntryService } from '../api/service/diary-entry.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import {AddDiaryEntryComponent} from "../add-diary-entry/add-diary-entry.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DiaryEntryComponent, AsyncPipe, NgForOf, AddDiaryEntryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public diaryEntries$!: Observable<DiaryEntry[]>;

  constructor(private diaryEntryService: DiaryEntryService) {}

  ngOnInit() {
    this.diaryEntries$ = this.diaryEntryService.getDiaryEntriesFromUserOfPastDays(
      '78b5b2a8-a7e5-477e-b882-9095ebeedd16', // FIXME
      new Date(),
      30
    );
  }
}
