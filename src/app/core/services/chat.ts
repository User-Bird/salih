import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private api = 'http://localhost:5000/api/chat';

  constructor(private http: HttpClient) {}

  sendMessage(data: any) {
    return this.http.post(`${this.api}/send`, data);
  }
}