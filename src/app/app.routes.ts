import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReportComponent } from './components/report/report.component';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/login/login.component';
import { ViewReportsComponent } from './components/view-reports/view-reports.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'report', 
    component: ReportComponent,
    canActivate: [authGuard]
  },
  { path: 'reports', component: ViewReportsComponent },
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
