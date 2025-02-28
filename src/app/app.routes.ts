import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'profile/:username', component: AppComponent },
  { path: '**', redirectTo: 'profile/octocat', pathMatch: 'full' },
];
