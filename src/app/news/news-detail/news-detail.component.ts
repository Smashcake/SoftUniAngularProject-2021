import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import { UserService } from 'src/app/user/user.service';
import { NewsService } from '../news.service';

import { IUserReport } from 'src/app/interfaces/user-report';
import { IComment } from 'src/app/interfaces/comment';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IMessage } from 'src/app/interfaces/message';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent {

  userId: string;
  newsDetail: any | undefined;
  totalNews: any;
  hasCommented: boolean;
  categories: any[];

  newsId: string = this.getNewsId();

  constructor(
    private newsService: NewsService,
    private route: Router, private auth: AngularFireAuth,
    private userService: UserService,) {
    this.getNewsData();
    this.auth.authState.subscribe(user => {
      this.userId = user?.uid ? user.uid : undefined;
    });
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

  private getNewsId() {
    const index: number = this.route.url.lastIndexOf('/');
    return this.route.url.substring(index + 1);
  }

  private redirectTo(uri: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }

  getNewsData() {
    return this.newsService.loadNewsData(this.newsId).get().subscribe(news => {
      if (news.data() === undefined) {
        this.route.navigateByUrl('not-found');
      };

      this.newsDetail = news.data();
      this.newsDetail.id = news.id;
      this.newsDetail.createdOn = this.newsDetail.createdOn;
      let userComments = [];
      userComments = this.newsDetail.comments;

      if (!userComments.find(x => x.authorId === this.userId)) {
        this.hasCommented = false;
      }
      else {
        this.hasCommented = true;
      }
    });
  }

  deleteNews(id: string) {
    this.newsService.deleteNews(id, this.userId).then(() => {
      setTimeout(() => this.route.navigateByUrl(''), 200)
    });
  }

  commentHandler(commentData: NgForm, articleId: string) {
    if (commentData.invalid) {
      return;
    };

    let commentInfo: IComment = {
      content: commentData.value.comment,
      createdOn: new Date(),
      authorId: this.userId,
      authorName: '',
      authorSurname: '',
      newsArticleId: articleId,
      id: ''
    };

    let message: IMessage = {
      sender: 'Automated',
      date: new Date(),
      content: 'Successfully added comment',
      read: false
    }

    this.userService.getUserData(this.userId).get().subscribe((user) => {
      commentInfo.authorName = user.data()?.name;
      commentInfo.authorSurname = user.data()?.surname;

      this.newsService.addComment(commentInfo).then(() => {
        this.newsService.addCommentToNewsArticle(articleId, commentInfo);
        this.userService.addCommentToUserComments(this.userId, commentInfo)
        this.userService.addMessageToUser(this.userId, message);
      }).then(() => {
        setTimeout(() => this.redirectTo(`news-detail/${articleId}`), 200);
      });
    });
  }

  deleteComment(commentId: string, newsArticleId: string, userId: string) {
    this.newsService.deleteComment(commentId, newsArticleId, userId).then(x => {
      let message: IMessage = {
        sender: 'Automated',
        date: new Date(),
        content: 'Successfully removed comment',
        read: false
      }
      this.userService.addMessageToUser(userId, message);
      setTimeout(() => this.redirectTo(`news-detail/${newsArticleId}`), 200);
    });
  }

  saveArticle(newsData: NgForm, newsId: string) {
    if (newsData.invalid) {
      return;
    }

    this.userService.editUserArticle(newsData.value, newsId, this.userId);
    this.newsService.editArticle(newsData.value, newsId).then(() => {
      setTimeout(() => this.redirectTo(`news-detail/${newsId}`), 200, 200);
    });
  }

  saveComment(content: string, commentId: string, newsArticleId: string, userId: string) {
    this.userService.editUserComment(commentId, userId, content);
    this.newsService.editArticleComment(newsArticleId, commentId, content).then(() => {
      setTimeout(() => this.redirectTo(`news-detail/${newsArticleId}`), 200, 200);
    });
  }

  reportNewsHandler(newsId: string, userId: string) {
    if (window.confirm("Are you sure you want to report this news article?")) {
      let newsReports: IUserReport[] = [];
      let userReport: IUserReport = {
        name: '',
        surname: '',
        userId: '',
        reportDate: new Date()
      };

      this.newsService.loadNewsData(newsId).get().subscribe(newsData => {
        newsReports = newsData?.data()?.reports;
        
        this.userService.getUserData(userId).get().subscribe(userData => {
          userReport.name = userData?.data()?.name;
          userReport.surname = userData?.data()?.surname;
          userReport.userId = userId;
          let hasUserReported: boolean;
          hasUserReported = newsReports.find(x => x.userId == userId) ? true : false;

          if (hasUserReported) {
            return window.alert('You have already reported this news article.');
          }

          let message: IMessage = {
            sender: 'Automated',
            date: new Date(),
            content: 'Successfully reported news article',
            read: false
          }

          newsReports.push(userReport);
          this.userService.addMessageToUser(userId, message);
          
          this.newsService.loadNewsData(newsId).update({ reports: newsReports })
            .then(() => {
              let newsReportsLength: number = 0;
              this.newsService.loadNewsData(newsId).get().subscribe(news => {
                newsReportsLength = news?.data()?.reports.length;

                if (newsReportsLength > 3) {
                  this.newsService.loadNewsData(newsId).update({ approved: false })
                };
              })
            }).then(() => {
              setTimeout(() => this.redirectTo(`news-detail/${newsId}`), 200, 200);
            });
        });
      });
    };

  }

}

