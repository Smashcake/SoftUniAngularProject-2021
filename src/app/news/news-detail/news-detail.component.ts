import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IComment } from 'src/app/interfaces/comment';
import { UserService } from 'src/app/user/user.service';
import { NewsService } from '../news.service';

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

  newsId: string = this.getNewsId();

  constructor(private newsService: NewsService, private route: Router, private auth: AngularFireAuth, private userService: UserService,) {
    this.getNewsData();
    this.auth.authState.subscribe(user => {
      this.userId = user?.uid ? user.uid : undefined;
    });
  }

  getNewsData() {
    return this.newsService.loadNewsData(this.newsId).get().subscribe(news => {
      if (news.data() === undefined) {
        this.route.navigateByUrl('not-found');
      }

      this.newsDetail = news.data();
      this.newsDetail.id = news.id;
      this.newsDetail.createdOn = this.newsDetail.createdOn;
      let userComments = [];
      userComments = this.newsDetail.comments;
      if (!userComments.find(x => x.authorId === this.userId)){
        this.hasCommented = false;
      }
      else{
        this.hasCommented = true;
      }
    });
    
  }

  deleteNews(id: string) {
    this.newsService.deleteNews(id, this.userId).then(x => {
      setTimeout(() => this.route.navigateByUrl(''), 200)
    }); 
  }

  commentHandler(commentData: NgForm, articleId: string) {
    if (commentData.invalid) {
      return;
    }

    let commentInfo: IComment = {
      content: commentData.value.comment,
      createdOn: new Date(),
      authorId: this.userId,
      authorName: '',
      authorSurname: '',
      newsArticleId: articleId,
      id: ''
    };

    this.userService.getUserData(this.userId).get().subscribe((user) => {
      commentInfo.authorName = user.data()?.name;
      commentInfo.authorSurname = user.data()?.surname;

      this.newsService.addComment(commentInfo).then(x => {
        this.newsService.addCommentToNewsArticle(articleId, commentInfo);
        this.userService.addCommentToUserComments(this.userId, commentInfo)
      }).then(y => {
        setTimeout(() => this.redirectTo(`news-detail/${articleId}`), 200);       
      });
    });

  }

  private getNewsId() {
    const index: number = this.route.url.lastIndexOf('/');
    return this.route.url.substring(index + 1);
  }

  redirectTo(uri: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }

  deleteComment(commentId: string, newsArticleId: string, userId: string){
    this.newsService.deleteComment(commentId, newsArticleId, userId).then(x => {
      setTimeout(() => this.redirectTo(`news-detail/${newsArticleId}`), 200);
    });
  }

  saveArticle(newsData: NgForm, newsId: string){
    if (newsData.invalid){
      return;
    }
    this.userService.editUserArticle(newsData.value, newsId, this.userId);
    this.newsService.editArticle(newsData.value, newsId).then(x => {
      setTimeout(() => this.redirectTo(`news-detail/${newsId}`), 200, 200);
    });
  }

  saveComment(content: string,commentId: string, newsArticleId: string, userId: string){
    this.userService.editUserComment(commentId, userId, content);
    this.newsService.editArticleComment(newsArticleId, commentId, content).then(x => {
      setTimeout(() => this.redirectTo(`news-detail/${newsArticleId}`), 200, 200);
    });
  }
}

