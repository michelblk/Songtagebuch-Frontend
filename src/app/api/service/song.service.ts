import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Song } from '../model/song';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private http: HttpClient) {}

  public search(query: string): Observable<Song[]> {
    return this.http.get<Song[]>(
      `${environment.backendBaseUrl}/song/search?query=${query}`,
      { withCredentials: true },
    );
  }
}
