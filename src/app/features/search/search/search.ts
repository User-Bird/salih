// search.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar';
import { UserService } from '../../../core/services/user';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent implements OnInit {

  query   = '';
  results: any[] = [];
  loading = false;

  tags = [
    '🪵 Woodworking', '🪡 Weaving', '🏺 Pottery', '🔨 Blacksmithing',
    '🧵 Embroidery', '💍 Jewelry', '🪨 Stonework', '🎨 Painting'
  ];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.query = params['q'];
        this.onSearch();
      }
    });
  }

  onSearch() {
    if (!this.query.trim()) {
      this.results = [];
      return;
    }
    this.loading = true;
    this.userService.searchUsers(this.query).subscribe({
      next: (data: any) => {
        this.results = data;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  searchTag(tag: string) {
    // Extract text without emoji
    this.query = tag.split(' ').slice(1).join(' ');
    this.onSearch();
  }
}