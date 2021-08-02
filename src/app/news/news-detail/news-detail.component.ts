import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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

  newsId: string = this.loadBlogIdFromRoute();

  constructor(private newsService: NewsService, private route: Router, private auth: AngularFireAuth, private userService: UserService) {
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
      let date: number = this.newsDetail.createdOn.seconds + this.newsDetail.createdOn.nanoseconds;
      this.newsDetail.createdOn = new Date(date);
    })
  }

  deleteNews(id) {
    this.newsService.deleteNews(id);
    this.route.navigateByUrl('');
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
      newsArticleId: articleId
    }
    
    this.userService.getUserData(this.userId).get().subscribe((user) => {
      commentInfo.authorName = user.data()?.name;
      commentInfo.authorSurname = user.data()?.surname;
      this.newsService.addComment(commentInfo).then(x => {
        this.newsService.addCommentToNewsArticle(articleId, commentInfo);
        this.userService.addCommentToUserComments(this.userId, commentInfo)
      }).then(y => {
        this.redirectTo(`news-detail/${articleId}`)
      });
    });

  }

  private loadBlogIdFromRoute() {
    const index: number = this.route.url.lastIndexOf('/');
    return this.route.url.substring(index + 1);
  }

  redirectTo(uri:string){
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.route.navigate([uri]));
 }

//  canUserComment(): boolean {
//    var comments = this.newsDetail.comments;
//    console.log("comments");
//    return false;
//  }
}

