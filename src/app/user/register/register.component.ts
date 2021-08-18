import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
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
export class RegisterComponent implements AfterViewInit{

  @ViewChild('passwordInput') passwordInput: ElementRef<HTMLInputElement>;
  @ViewChild('confirmPasswordInput') confirmPasswordInput: ElementRef<HTMLInputElement>;


  constructor(private userService: UserService, private auth: AngularFireAuth, private route: Router, private renderer: Renderer2) { }
  ngAfterViewInit(): void {
    this.renderer.setStyle(this.passwordInput.nativeElement, 'type', 'password');
    this.renderer.setStyle(this.confirmPasswordInput.nativeElement, 'type', 'password');
  }

  registerHandler(registerData: NgForm){
    if(registerData.invalid){
      return;
    }
    let userInput: IRegisterUser = registerData.value;
    userInput.newsArticles = [];
    userInput.comments = [];
    userInput.createdOn = new Date();
    userInput.role = 'user';
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

    this.route.navigateByUrl("/");
  }

  togglePasswordVisibility(){
    if (this.passwordInput.nativeElement.type === 'password'){
      this.renderer.setAttribute(this.passwordInput.nativeElement, 'type' , 'text');
    }
    else {
      this.renderer.setAttribute(this.passwordInput.nativeElement, 'type' , 'password');
    }
  }

  toggleConfirmPasswordVisibility(){
    if (this.confirmPasswordInput.nativeElement.type === 'password'){
      this.renderer.setAttribute(this.passwordInput.nativeElement, 'type' , 'text');
    }
    else {
      this.renderer.setAttribute(this.passwordInput.nativeElement, 'type' , 'password');
    }
  }
}
