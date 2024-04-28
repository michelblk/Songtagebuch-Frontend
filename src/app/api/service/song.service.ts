import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Song} from "../model/song";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  public search(query: string): Observable<Song[]> {
    return this.http.get<Song[]>(`http://localhost:8080/song/search?query=${query}`, {withCredentials: true})
  }
}
