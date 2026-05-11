// notifications.ts
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notification';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/sidebar/sidebar';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  loading = true;
  loadError = '';

  constructor(
    private notifService: NotificationService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (!this.auth.getToken()) {
      this.router.navigate(['/login']);
      return;
    }

    this.notifService.getNotifications().subscribe({
      next: (data: any) => {
        this.notifications = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.loadError = err?.error?.message || 'Could not load notifications.';
        if (err?.status === 401) {
          this.auth.logout();
          this.router.navigate(['/login']);
        }
      },
    });
  }
}
