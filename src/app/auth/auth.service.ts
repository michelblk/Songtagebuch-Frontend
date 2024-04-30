import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { UserService } from '../api/service/user.service';
import { environment } from '../../environments/environment';
import { User } from '../api/model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly user$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public readonly isLoggedIn$: BehaviorSubject<boolean | null> =
    new BehaviorSubject<boolean | null>(null);

  constructor(private userService: UserService) {
    this.checkLoginStatus();
    interval(environment.loginStatusCheckIntervalS * 1000).subscribe(() =>
      this.checkLoginStatus(),
    );
  }

  private checkLoginStatus(): void {
    this.userService.getMe().subscribe({
      next: (user: User) => this.login(user),
      error: () => this.logout(),
    });
  }

  private login(user: User): void {
    if (this.user$.getValue() != user || this.isLoggedIn$.getValue() != true) {
      this.user$.next(user);
      this.isLoggedIn$.next(true);
    }
  }

  private logout(): void {
    if (this.user$.getValue() != null || this.isLoggedIn$.getValue() != false) {
      this.user$.next(null);
      this.isLoggedIn$.next(false);
    }
  }
}
