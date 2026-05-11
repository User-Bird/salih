import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private api = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(this.api);
  }

  createPost(data: any) {
    return this.http.post(this.api, data);
  }
}