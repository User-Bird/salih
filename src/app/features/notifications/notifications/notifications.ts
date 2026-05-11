// notifications.ts
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notification';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/sidebar/sidebar';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.css']
})
export class NotificationsComponent implements OnInit {

  notifications: any[] = [];
  loading = true;

  constructor(private notifService: NotificationService) {}

  ngOnInit() {
    this.notifService.getNotifications().subscribe({
      next: (data: any) => {
        this.notifications = data;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}