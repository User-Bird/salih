// post-card.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../core/services/post';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.html',
  styleUrls: ['./post-card.css'],
})
export class PostCardComponent implements OnInit {
  @Input() post: any;

  liked = false;
  likesCount = 0;
  showComments = false;
  likeLoading = false;

  private currentUserId: string | null = null;

  constructor(
    private postService: PostService,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.likesCount = this.post?.likes?.length || 0;
    this.currentUserId = this.auth.getUser()?._id || null;
    // check if current user already liked this post
    this.liked = this.post?.likes?.includes(this.currentUserId) ?? false;
  }

  toggleLike() {
    if (this.likeLoading) return; // prevent double clicks
    this.likeLoading = true;

    this.postService.likePost(this.post._id).subscribe({
      next: (res: any) => {
        this.liked = res.liked;
        this.likesCount = res.likesCount;
        this.likeLoading = false;
      },
      error: () => {
        this.likeLoading = false;
      },
    });
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }
}
