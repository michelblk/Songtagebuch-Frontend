import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiaryEntry } from '../model/diary-entry';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DiaryEntryService {
  constructor(private http: HttpClient) {}

  public getDiaryEntriesFromUserOfPastDays(
    userid: string,
    date: Date,
    numberOfDays: number
  ): Observable<DiaryEntry[]> {
    const endDateStr: string = formatDate(date, 'yyyy-MM-dd', 'EN');
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - numberOfDays);
    const startDateStr: string = formatDate(startDate, 'yyyy-MM-dd', 'EN');

    return this.http.get<DiaryEntry[]>(
      `http://localhost:8080/users/${userid}/diary?from=${startDateStr}&until=${endDateStr}`,
      { withCredentials: true }
    );
  }
}
