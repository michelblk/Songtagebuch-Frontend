import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getMe(): Observable<User> {
    return this.http.get<User>('http://localhost:8080/users/me', {
      withCredentials: true,
    });
  }
}
