import { Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/history', pathMatch: 'full' },
  { path: 'history', component: HistoryComponent, canActivate: [authGuard] },
];
