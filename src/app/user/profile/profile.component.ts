import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IRegisterUser } from 'src/app/interfaces/register-user';
import { IUserProfile } from 'src/app/interfaces/user-profile';
import { NewsService } from 'src/app/news/news.service';
import { UserService } from '../user.service';

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

  constructor(private auth: AngularFireAuth, private userService: UserService, private newsService: NewsService, private route: Router) {
    this.auth.authState.subscribe(user => {
      this.userId = user?.uid ? user.uid : undefined;
      this.userService.getUserData(this.userId).get().subscribe(user => {
        this.userProfile.newsArticles = user?.data().newsArticles;
        this.userProfile.comments = user?.data().comments;
        this.userProfile.name = user?.data().name;
        this.userProfile.surname = user?.data().surname;
        this.userProfile.email = user?.data().email;
        this.userProfile.password = user?.data().password;
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

  deleteArticle(articleId: string) {
    this.newsService.deleteNews(articleId, this.userId).then(x => {
      setTimeout(() => this.redirectTo(`profile/${this.userId}`), 200);
    });

  }
}
