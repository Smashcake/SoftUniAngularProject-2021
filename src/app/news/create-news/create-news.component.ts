import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserService } from 'src/app/user/user.service';
import { NewsService } from '../news.service';

import { INewsArticle } from 'src/app/interfaces/news-article';
import { IRegisterUser } from 'src/app/interfaces/register-user';
import { IMessage } from 'src/app/interfaces/message';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {

  newsCall: string = 'News';
  userId: string;
  categories = [];

  constructor(
    private newsService: NewsService,
    private route: Router,
    private auth: AngularFireAuth,
    private userService: UserService) {
    this.auth.authState.subscribe(user => {
      this.userId = user?.uid;
    })
  }

  ngOnInit(): void {
    this.newsService.loadCategories().get().subscribe(category => {
      this.categories = category.docs.map(category => {
        return {
          name: category.data().name
        };
      })
    });
  }

  createNews(newsData: NgForm) {
    if (newsData.invalid) {
      return "Good attemp at Obscurity,Department of Homeland Security";
    };

    let formInput = newsData.value;

    if (formInput.category == '') {
      formInput.category = 'Business';
    };

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
      id: '',
      category: formInput.category,
      approved: false
    }

    let message: IMessage = {
      sender: 'Automated',
      date: new Date(),
      content: 'Successfully added news article for review',
      read: false
    }

    this.userService.getUserData(this.userId).get().subscribe(userData => {
      news.createdBy.name = userData.data()?.name;
      news.createdBy.surname = userData.data()?.surname;
      this.newsService.createNews(news).then(x => {
        this.userService.addArticleToUser(this.userId, news);
        this.userService.addMessageToUser(this.userId, message);
      })
      this.route.navigateByUrl("");
    });
  }
}
