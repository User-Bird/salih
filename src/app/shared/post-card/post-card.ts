// post-card.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.html',
  styleUrls: ['./post-card.css']
})
export class PostCardComponent implements OnInit {

  @Input() post: any;

  liked      = false;
  likesCount = 0;
  showComments = false;

  ngOnInit() {
    this.likesCount = this.post?.likes?.length || 0;
  }

  toggleLike() {
    this.liked = !this.liked;
    this.likesCount += this.liked ? 1 : -1;
    // TODO: connect to PostService.likePost(this.post._id)
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }
}