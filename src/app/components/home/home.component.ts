import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  handleReportClick() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.router.navigate(['/report']);
      } else {
        this.router.navigate(['/login'], { queryParams: { returnUrl: '/report' } });
      }
    });
  }
} 