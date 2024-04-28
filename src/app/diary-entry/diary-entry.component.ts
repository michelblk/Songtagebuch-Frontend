import { Component, Input } from '@angular/core';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { DiaryEntry } from '../api/model/diary-entry';

@Component({
  selector: 'app-diary-entry',
  standalone: true,
  imports: [NgForOf, DatePipe, NgIf],
  templateUrl: './diary-entry.component.html',
  styleUrl: './diary-entry.component.scss',
})
export class DiaryEntryComponent {
  @Input()
  entry!: DiaryEntry;
}
