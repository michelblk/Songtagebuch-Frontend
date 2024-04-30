import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { filter, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);

  // @ts-ignore
  return authService.isLoggedIn$.pipe(
    tap((isLoggedIn: boolean | null) => {
      if (isLoggedIn == false) {
        location.href = environment.backendLoginEndpoint;
      }
    }),
    filter((status: boolean | null) => status != null), // wait until login status is known
  );
};
