// login.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // ← RouterLink added
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  login() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        this.auth.saveUser(res);
        this.loading = false; // ← fixed: reset loading on success too
        this.router.navigate(['/feed']);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Invalid email or password.';
        this.loading = false;
      },
    });
  }
}
