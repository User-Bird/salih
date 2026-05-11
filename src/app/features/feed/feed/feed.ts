// feed.ts
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../core/services/post';
import { AuthService } from '../../../core/services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from '../../../shared/post-card/post-card';
import { SidebarComponent } from '../../../shared/sidebar/sidebar';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, PostCardComponent, SidebarComponent],
  templateUrl: './feed.html',
  styleUrls: ['./feed.css']
})
export class FeedComponent implements OnInit {

  posts: any[] = [];
  content    = '';
  loading    = true;
  posting    = false;
  userInitial = '?';

  constructor(
    private postService: PostService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const user = this.auth.getUser();
    if (user?.name) {
      this.userInitial = user.name.charAt(0).toUpperCase();
    }
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.postService.getPosts().subscribe({
      next: (data: any) => {
        this.posts   = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  createPost() {
    if (!this.content.trim()) return;
    this.posting = true;

    this.postService.createPost({ content: this.content }).subscribe({
      next: () => {
        this.content = '';
        this.posting = false;
        this.loadPosts();
      },
      error: () => {
        this.posting = false;
      }
    });
  }
}