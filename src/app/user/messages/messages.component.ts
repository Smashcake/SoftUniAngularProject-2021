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
    private userService: UserService,
    private route: Router
  ) {
    this.loadMessages();
  }

  private redirectTo(uri: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }

  loadMessages() {
    this.userService.getUserData(this.userService.userId).get().subscribe(userData => {
      this.messages = userData?.data()?.messages.sort((x, y) => y.date - x.date);
      this.messages.sort((x, y) => Number(x.read) - Number(y.read));
    })
  }

  deleteMessage(time: Date) {
    this.userService.removeMessageFromUser(this.userService.userId, time);
    setTimeout(() => this.redirectTo(`messages/${this.userService.userId}`), 200);
  }
}
