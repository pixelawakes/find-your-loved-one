import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;

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
      });
    });
  }

  handleReportClick() {
    if (this.isLoggedIn) {
      this.router.navigate(['/report']);
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/report' } });
    }
  }
} 