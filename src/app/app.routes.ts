import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'report', component: CounterComponent },
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
