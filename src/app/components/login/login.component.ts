import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="login-container">
      <h2>Login Required</h2>
      <p class="message">Please sign in to submit a report.</p>
      <button (click)="signInWithGoogle()" class="google-btn">
        <img src="assets/google-icon.svg" alt="Google" class="google-icon">
        Sign in with Google
      </button>
      <div *ngIf="error" class="error-message">
        {{ error }}
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      background: white;
    }

    h2 {
      text-align: center;
      margin-bottom: 1rem;
      color: #333;
    }

    .message {
      text-align: center;
      color: #666;
      margin-bottom: 2rem;
    }

    .google-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
      color: #757575;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .google-btn:hover {
      background-color: #f5f5f5;
    }

    .google-icon {
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }

    .error-message {
      color: #d32f2f;
      margin-top: 1rem;
      text-align: center;
    }
  `]
})
export class LoginComponent implements OnInit {
  error: string | null = null;
  returnUrl: string = '/';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
    });
  }

  async signInWithGoogle() {
    try {
      await this.authService.signInWithGoogle();
      this.error = null;
      this.router.navigate([this.returnUrl]);
    } catch (err) {
      this.error = 'Failed to sign in with Google. Please try again.';
      console.error('Login error:', err);
    }
  }
} 