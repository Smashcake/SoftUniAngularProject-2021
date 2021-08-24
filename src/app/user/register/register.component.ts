import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';

import { IRegisterUser } from 'src/app/interfaces/register-user';
import { IMessage } from 'src/app/interfaces/message';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private userService: UserService,
    private auth: AngularFireAuth,
    private route: Router) { }

  registerHandler(registerData: NgForm) {
    if (registerData.invalid) {
      return;
    }

    let userInput: IRegisterUser = registerData.value;
    userInput.newsArticles = [];
    userInput.comments = [];
    userInput.messages = [];
    userInput.createdOn = new Date();
    userInput.role = 'user';

    if (userInput.name === '' || userInput.surname === '' || userInput.email === '' || userInput.password === '' || userInput.password === '') {
      return "sneaky sneaky mr.hacker";
    }
    if (userInput.password !== userInput.confirmPassword) {
      return "nice try,FBI";
    }

    let message: IMessage = {
      sender: 'Automated',
      date: new Date(),
      content: 'Thank you for registering with us.We hope you enjoy your stay.',
      read: false,
      id: ''
    }

    this.userService.registerUser(userInput)
      .then(() => {
        this.auth.authState.subscribe(u => {
          this.userService.addUserToDB(u.uid, userInput);
          this.userService.addMessageToUserAndDB(u.uid, message);
        });
      }).catch(err => {
        console.log(err);
      });

    this.route.navigateByUrl("/");
  }

}
