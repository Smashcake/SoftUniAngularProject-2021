import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { INewsArticle } from '../interfaces/news-article';
import { IComment } from '../interfaces/comment';
import { UserService } from '../user/user.service';

@Injectable()
export class NewsService {

  newsCall: string = "news";
  comments: string = "comments";

  constructor(private firestore: AngularFirestore, private userService: UserService) { }

  loadNews(): AngularFirestoreCollection {
    return this.firestore.collection(this.newsCall);
  }

  loadNewsData(id: string): AngularFirestoreDocument {
    return this.firestore.collection(this.newsCall).doc(id);
  }

  createNews(newsData: INewsArticle): Promise<any> {
    return this.firestore.collection(this.newsCall).add(newsData).then(docRef => {
      newsData.id = docRef.id;
    });
  }

  deleteNews(newsId: string, userId: string): Promise<any> {
    let currentUser: any = {};
    let userArticles = [];
    let newsIndex: any;
    this.userService.getUserData(userId).get().subscribe(user => {
      currentUser = user?.data();
      userArticles = currentUser?.newsArticles === undefined ? [] : currentUser.newsArticles;
      newsIndex = userArticles.findIndex(x => x.id === newsId);
      if (newsIndex > - 1) {
        userArticles.splice(newsIndex, 1);
      }
      this.userService.getUserData(userId).update({ newsArticles: userArticles });
    });
    return this.firestore.collection(this.newsCall).doc(newsId).delete();
  }

  addComment(commentInfo: IComment): Promise<any> {
    return this.firestore.collection(this.comments).add(commentInfo).then(docRef => {
      commentInfo.id = docRef.id;
    });
  }

  addCommentToNewsArticle(newsArticleId: string, comment: IComment) {
    let article: any = {};
    let articleComments = [];
    this.loadNewsData(newsArticleId).get().subscribe(news => {
      article = news.data();
      articleComments = article?.comments === undefined ? [] : article?.comments;
      articleComments.push(comment);
      this.loadNewsData(newsArticleId).update({ comments: articleComments });
    });
  }

  deleteComment(commentId: string, newsArticleId: string, userId: string): Promise<any> {
    let articleCommentIndex: any;
    let userCommentIndex: any;
    let article: any = {};
    let articleComments = [];
    let userInfo: any = {};
    let userComments = [];
    this.loadNewsData(newsArticleId).get().subscribe(news => {
      article = news.data();
      articleComments = article?.comments === undefined ? [] : article?.comments;
      articleCommentIndex = articleComments.findIndex(x => x.id === commentId);
      if (articleCommentIndex > -1) {
        articleComments.splice(articleCommentIndex, 1);
      }
      this.loadNewsData(newsArticleId).update({ comments: articleComments });
    });
    this.userService.getUserData(userId).get().subscribe(user => {
      userInfo = user.data();
      userComments = userInfo?.comments === undefined ? [] : userInfo?.comments;
      userCommentIndex = userComments.findIndex(x => x.id === commentId);
      if (userCommentIndex > -1) {
        userComments.splice(userCommentIndex, 1);
      }
      this.userService.getUserData(userId).update({ comments: userComments });
    });
    return this.firestore.collection(this.comments).doc(commentId).delete();
  }

  editArticle(articleData: INewsArticle, id: string){
    return this.firestore.collection(this.newsCall).doc(id).update({ title: articleData.title, content: articleData.content});
  }
}
