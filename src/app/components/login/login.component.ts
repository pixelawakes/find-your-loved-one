import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <button (click)="signInWithGoogle()" class="google-btn">
        <img src="assets/google-icon.png" alt="Google" class="google-icon">
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
      margin-bottom: 2rem;
      color: #333;
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
export class LoginComponent {
  error: string | null = null;

  constructor(private authService: AuthService) {}

  async signInWithGoogle() {
    try {
      await this.authService.signInWithGoogle();
      this.error = null;
    } catch (err) {
      this.error = 'Failed to sign in with Google. Please try again.';
    }
  }
} 