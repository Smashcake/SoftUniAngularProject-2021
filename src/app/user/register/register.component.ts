import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { IRegisterUser } from 'src/app/interfaces/register-user';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  constructor(private userService: UserService, private auth: AngularFireAuth, private route: Router) { }

  registerHandler(registerData: NgForm){
    if(registerData.invalid){
      return;
    }
    let userInput: IRegisterUser = registerData.value;
    userInput.newsArticles = [];
    userInput.comments = [];
    userInput.createdOn = new Date();
    if(userInput.name === ''  || userInput.surname === '' || userInput.email === '' || userInput.password === '' || userInput.password === ''){
      return "sneaky sneaky mr.hacker";
    }
    if(userInput.password !== userInput.confirmPassword){
      return "nice try,FBI";
    }

    this.userService.registerUser(userInput)
    .then(x => {
      this.auth.authState.subscribe(u => {
        this.userService.addUserToDB(u.uid, userInput);
      });
    }).catch(err => {
      console.log(err);
    });

    this.route.navigateByUrl("/login");
  }
}
