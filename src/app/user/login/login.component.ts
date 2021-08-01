import { Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginUser } from 'src/app/interfaces/login-user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private auth: AngularFireAuth, private route: Router) { }

  loginHandler(loginData: NgForm){
    if(loginData.invalid){
      return "not today,CIA";
    }
    let userInput: ILoginUser = loginData.value;
    if(userInput.email === '' && userInput.password === ''){
      return "dirty tricks,MI6";
    }

    this.userService.loginUser(userInput)
    .then(x => {
      this.auth.onAuthStateChanged((user) =>{
        if(user){
          this.route.navigateByUrl("");
        }
        else{
          this.route.navigateByUrl('/login')
        }
      })
  })
    .catch(err => {
      console.log(err);
      this.route.navigateByUrl("/login");
    });   
  }
}
