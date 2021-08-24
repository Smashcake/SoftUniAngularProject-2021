import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

import { IMessage } from 'src/app/interfaces/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  messages: IMessage[];

  constructor(
    private userService: UserService
  ) {
    this.userService.messageEvent.subscribe(messages => {
      this.messages = messages;
    })
    this.loadMessages();
  }

  loadMessages() {
    this.userService.getUserData(this.userService.userId).get().subscribe(userData => {
      this.messages = userData?.data()?.messages.sort((x, y) => y.date - x.date);
      this.messages.sort((x, y) => Number(x.read) - Number(y.read));
    })
  }

  markAsRead(messageId: string, userId: string, read: boolean) {
    this.userService.markMessage(messageId, userId, read);   
  }

  deleteMessage(messageId: string) {
    this.userService.removeMessageFromUser(this.userService.userId, messageId);
  }

}
