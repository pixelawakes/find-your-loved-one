import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Find Your Loved One';
  currentYear = new Date().getFullYear();
  isLoggedIn = false;
  userEmail: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isInitialized().pipe(
      filter(initialized => initialized),
      take(1)
    ).subscribe(() => {
      this.authService.getCurrentUser().subscribe(user => {
        this.isLoggedIn = !!user;
        this.userEmail = user?.email || null;
      });
    });
  }

  async signOut() {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  handleReportClick() {
    if (this.isLoggedIn) {
      this.router.navigate(['/report']);
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/report' } });
    }
  }
}
