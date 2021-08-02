import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { INewsArticle } from '../interfaces/news-article';
import { IComment } from '../interfaces/comment';

@Injectable()
export class NewsService {

  newsCall: string = "News";
  comments: string = "comments";

  constructor(private firestore: AngularFirestore) { }

  loadNews() : AngularFirestoreCollection{
    return this.firestore.collection(this.newsCall);
  }

  loadNewsData(id: string): AngularFirestoreDocument {
    return this.firestore.collection(this.newsCall).doc(id);
  }
  
  createNews(newsData: INewsArticle): Promise<any>{
    return this.firestore.collection(this.newsCall).add(newsData);
  }

  deleteNews(id: string): void{
    this.firestore.collection(this.newsCall).doc(id).delete();
  }

  addComment(commentInfo: IComment): Promise<any>{
    return this.firestore.collection(this.comments).add(commentInfo);
  }

  addCommentToNewsArticle(newsArticleId: string, comment: IComment){
    let article: any = {};
    let articleComments = [];
    this.loadNewsData(newsArticleId).get().subscribe(news => {
     article = news.data();
     articleComments = article?.comments === undefined ? [] : article?.comments;
     articleComments.push(comment);
     this.loadNewsData(newsArticleId).update({ comments: articleComments});
    });
  }
}
