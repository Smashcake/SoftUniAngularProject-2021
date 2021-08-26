import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { NewsService } from 'src/app/news/news.service';
import { UserService } from '../user.service';

import { IUserProfile } from 'src/app/interfaces/user-profile';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { IMessage } from 'src/app/interfaces/message';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userProfile: IUserProfile = {
    newsArticles: [],
    comments: [],
    name: '',
    surname: '',
    email: '',
    password: '',
  };

  userId: string;

  constructor(
    private auth: AngularFireAuth,
    private userService: UserService,
    private newsService: NewsService,
    private route: Router) {
    this.newsService.userCommentsEvent.subscribe(comments => {
      this.userProfile.comments = comments;
    })
      this.auth.authState.subscribe(user => {
        this.userId = user?.uid ? user.uid : undefined;
        this.bindUserData(this.userService.getUserData(this.userId));
      });
  }

  private bindUserData(document: AngularFirestoreDocument) {
    document.get().subscribe(user => {
      this.userProfile.newsArticles = user?.data().newsArticles;
      this.userProfile.comments = user?.data().comments;
      this.userProfile.name = user?.data().name;
      this.userProfile.surname = user?.data().surname;
      this.userProfile.email = user?.data().email;
    });
  }

  deleteComment(id: string, articleId: string) {
    this.newsService.deleteComment(id, articleId, this.userId).then(() => {
      let message: IMessage = {
        sender: 'Automated',
        date: new Date(),
        content: 'Successfully removed comment.',
        read: false,
        id: ''
      }
      this.userService.addMessageToUserAndDB(this.userId, message);
      this.bindUserData(this.userService.getUserData(this.userId));
    });
  }

  redirectTo(uri: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }

  saveProfile(name: string, surname: string, email: string, oldEmail: string, userId: string) {
    if (email !== oldEmail) {
      this.userService.updateUserEmail(email);
      this.userService.getUserData(userId).update({ name: name, surname: surname, email: email })
        .then(() => {
          this.bindUserData(this.userService.getUserData(this.userId));
        });
    }
    else {
      this.userService.getUserData(userId).update({ name: name, surname: surname })
        .then(() => {
          this.bindUserData(this.userService.getUserData(this.userId));
        });;
    }
  }

}
