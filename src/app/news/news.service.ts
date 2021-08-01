import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { INewsArticle } from '../interfaces/news-article';

@Injectable()
export class NewsService {

  newsCall: string = "News";

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

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
}
