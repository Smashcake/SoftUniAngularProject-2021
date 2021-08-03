import { Component, OnInit } from '@angular/core';
import { INewsArticle } from 'src/app/interfaces/news-article';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/user/user.service';
import { NgForm } from '@angular/forms';
import { IRegisterUser } from 'src/app/interfaces/register-user';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {

  newsCall = 'News';
  userId: string;

  constructor(private newsService: NewsService, private route: Router, private auth: AngularFireAuth, private userService: UserService) {
    this.auth.authState.subscribe(user => {
      this.userId = user?.uid;
    })
  }

  ngOnInit(): void {
  }

  createNews(newsData: NgForm) {
    if (newsData.invalid) {
      return "Good attemp at Obscurity,Department of Homeland Security";
    }

    let formInput = newsData.value;

    let news: INewsArticle = {
      title: formInput.title,
      createdOn: new Date(),
      comments: [],
      createdBy: {
        name: '',
        surname: ''
      } as IRegisterUser,
      content: formInput.content,
      createdById: this.userId,
      id: ''
    }
    
    this.userService.getUserData(this.userId).get().subscribe(userData => {
      news.createdBy.name = userData.data()?.name;
      news.createdBy.surname = userData.data()?.surname;
      this.newsService.createNews(news).then(x => {
        this.userService.addArticleToUser(this.userId, news);
      })
      this.route.navigateByUrl("");
    });
  }
}
