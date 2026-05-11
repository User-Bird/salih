// profile.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/sidebar/sidebar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  loading = true;
  editing = false;
  saving = false;
  saveError = '';
  loadError = '';

  form = { name: '', profession: '', city: '', bio: '' };

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Guard: no token → go to login immediately
    if (!this.auth.getToken()) {
      this.router.navigate(['/login']);
      return;
    }

    this.userService.getProfile().subscribe({
      next: (data: any) => {
        this.user = data;
        this.loading = false;
        this.populateForm(data);
      },
      error: (err) => {
        this.loading = false;
        this.loadError = err?.error?.message || 'Could not load profile. Please try again.';
        // 401 = token expired or invalid
        if (err?.status === 401) {
          this.auth.logout();
          this.router.navigate(['/login']);
        }
      },
    });
  }

  private populateForm(data: any) {
    this.form = {
      name: data.name || '',
      profession: data.profession || '',
      city: data.city || '',
      bio: data.bio || '',
    };
  }

  toggleEdit() {
    this.editing = !this.editing;
    this.saveError = '';
    if (this.editing) {
      this.populateForm(this.user);
    }
  }

  saveProfile() {
    this.saving = true;
    this.saveError = '';

    this.userService.updateProfile(this.form).subscribe({
      next: (updated: any) => {
        this.user = updated;
        this.saving = false;
        this.editing = false;
      },
      error: (err) => {
        this.saveError = err?.error?.message || 'Failed to save. Try again.';
        this.saving = false;
      },
    });
  }
}
