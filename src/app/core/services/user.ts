// user.ts — updated service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${this.api}/profile`);
  }

  updateProfile(data: any) {
    return this.http.put(`${this.api}/profile`, data);
  }

  searchUsers(query: string) {
    return this.http.get(`${this.api}/search?q=${encodeURIComponent(query)}`);
  }
}