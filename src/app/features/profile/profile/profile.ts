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
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  user: any    = null;
  loading      = true;
  editing      = false;
  saving       = false;

  form = { name: '', profession: '', city: '', bio: '' };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (data: any) => {
        this.user    = data;
        this.loading = false;
        this.form = {
          name:       data.name || '',
          profession: data.profession || '',
          city:       data.city || '',
          bio:        data.bio || ''
        };
      },
      error: () => { this.loading = false; }
    });
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  saveProfile() {
    this.saving = true;
    // TODO: connect to userService.updateProfile(this.form)
    // For now just update local state
    setTimeout(() => {
      Object.assign(this.user, this.form);
      this.saving  = false;
      this.editing = false;
    }, 600);
  }
}