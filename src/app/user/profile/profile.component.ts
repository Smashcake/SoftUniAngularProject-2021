import { Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { IUserProfile } from 'src/app/interfaces/user-profile';
import { NewsService } from 'src/app/news/news.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  
  @ViewChild('passwordInput') passwordInput: ElementRef<HTMLInputElement>;
  @ViewChild('confirmPasswordInput') confirmPasswordInput: ElementRef<HTMLInputElement>;

  userProfile: IUserProfile = {
    newsArticles: [],
    comments: [],
    name: '',
    surname: '',
    email: '',
    password: '',
  };

  userId: string;

  constructor(private auth: AngularFireAuth, private userService: UserService, private newsService: NewsService, private route: Router, private renderer: Renderer2) {
    this.auth.authState.subscribe(user => {
      this.userId = user?.uid ? user.uid : undefined;
      this.userService.getUserData(this.userId).get().subscribe(user => {
        this.userProfile.newsArticles = user?.data().newsArticles;
        this.userProfile.comments = user?.data().comments;
        this.userProfile.name = user?.data().name;
        this.userProfile.surname = user?.data().surname;
        this.userProfile.email = user?.data().email;
      });
    });
  }

  deleteComment(id: string, articleId: string) {
    this.newsService.deleteComment(id, articleId, this.userId).then(x => {
      setTimeout(() => this.redirectTo(`profile/${this.userId}`), 200);
    });
  }

  redirectTo(uri: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }

  saveProfile(name: string, surname: string, email: string, oldEmail: string, userId: string) {
    if (email !== oldEmail){
      this.userService.updateUserEmail(email);
      this.userService.getUserData(userId).update({ name: name, surname: surname, email: email});
    }
    else{
      this.userService.getUserData(userId).update({ name: name, surname: surname});
    }
  }

  // togglePasswordVisibility(){
  //   let element = this.passwordInput.nativeElement;
  //   if (element.type === 'password'){
  //     this.renderer.setAttribute(element, 'type' , 'text');
  //   }
  //   else {
  //     this.renderer.setAttribute(element, 'type' , 'password');
  //   }
  // }

  // toggleConfirmPasswordVisibility(){
  //   let element = this.confirmPasswordInput.nativeElement;
  //   if (element.type === 'password'){
  //     this.renderer.setAttribute(element, 'type' , 'text');
  //   }
  //   else {
  //     this.renderer.setAttribute(element, 'type' , 'password');
  //   }
  // }

}
