import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';

import { ILoginUser } from 'src/app/interfaces/login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('loginError') loginError : ElementRef;

  constructor(
    private userService: UserService,
    private auth: AngularFireAuth,
    private route: Router,
    private renderer: Renderer2) { }

  loginHandler(loginData: NgForm) {
    if (loginData.invalid) {
      return "not today,CIA";
    }

    let userInput: ILoginUser = loginData.value;
    if (userInput.email === '' && userInput.password === '') {
      return "dirty tricks,MI6";
    }

    this.userService.loginUser(userInput)
      .then(x => {
        this.auth.onAuthStateChanged((user) => {
          if (user) {
            this.route.navigateByUrl("");
          }
          else {
            this.route.navigateByUrl('/login')
          }
        })
      })
      .catch(err => {
        this.renderer.setStyle(this.loginError.nativeElement, 'display', 'block');
        this.loginError.nativeElement.innerText = err.message;
      });
  }
}
