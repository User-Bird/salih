// chat.ts
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../core/services/chat';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/sidebar/sidebar';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent implements OnInit {

  message      = '';
  searchUser   = '';
  selectedId   = '';
  selectedName = '';

  conversations: any[] = [];
  messages: any[]      = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // TODO: load conversations from ChatService.getConversations()
    // Placeholder data for now:
    this.conversations = [];
  }

  selectConversation(conv: any) {
    this.selectedId   = conv.id;
    this.selectedName = conv.name;
    // TODO: load messages from ChatService.getMessages(conv.id)
    this.messages = [];
  }

  sendMessage() {
    if (!this.message.trim() || !this.selectedId) return;

    const text = this.message.trim();
    this.message = '';

    // Optimistically add to UI
    this.messages.push({
      text,
      mine: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Send via HTTP + Socket
    this.chatService.sendMessage({
      receiver: this.selectedId,
      text
    }).subscribe();
  }
}