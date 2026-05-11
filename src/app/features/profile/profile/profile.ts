// profile.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user';
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

  form = { name: '', profession: '', city: '', bio: '' };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (data: any) => {
        this.user = data;
        this.loading = false;
        this.populateForm(data);
      },
      error: () => {
        this.loading = false;
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
      this.populateForm(this.user); // reset form on open
    }
  }

  // Fix 6: now calls the real API instead of a fake setTimeout
  saveProfile() {
    this.saving = true;
    this.saveError = '';

    this.userService.updateProfile(this.form).subscribe({
      next: (updated: any) => {
        this.user = updated; // refresh displayed data
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
