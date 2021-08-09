import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { IRegisterUser } from '../interfaces/register-user';
import { ILoginUser } from '../interfaces/login-user';
import { IComment } from '../interfaces/comment';
import { INewsArticle } from '../interfaces/news-article';

@Injectable()
export class UserService {

  userCall = "users";

  isLogged: boolean;


  constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.fireAuth.onAuthStateChanged((user) => {
      if (user === null) {
        this.isLogged = false;
      }
      else {
        this.isLogged = true;
      }
    })
  }

  registerUser(registerData: IRegisterUser) {
    return this.fireAuth.createUserWithEmailAndPassword(registerData.email, registerData.password);
  }

  addUserToDB(userId, userData: IRegisterUser) {
    this.firestore.collection(this.userCall).doc(userId).set({
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      createdOn: userData.createdOn,
      comments: userData.comments,
      newsArticles: userData.newsArticles
    })
  };

  loginUser(loginData: ILoginUser) {
    return this.fireAuth.signInWithEmailAndPassword(loginData.email, loginData.password);
  }

  logoutUser() {
    return this.fireAuth.signOut();
  }

  getUserData(id: string): AngularFirestoreDocument {
    return this.firestore.collection(this.userCall).doc(id);
  }

  addCommentToUserComments(userId: string, comment: IComment): Promise<any> {
    let currentUser: any = {};
    let comments = [];
    this.getUserData(userId).get().subscribe(user => {
      currentUser = user.data();
      comments = currentUser?.comments === undefined ? [] : currentUser.comments;
      comments.push(comment);
      this.getUserData(userId).update({ comments: comments });
    });
    return;
  }

  addArticleToUser(userId: string, article: INewsArticle): Promise<any> {
    let currentUser: any = {};
    let articles = [];
    this.getUserData(userId).get().subscribe(user => {
      currentUser = user.data();
      articles = currentUser?.newsArticles === undefined ? [] : currentUser.newsArticles;
      articles.push(article);
      this.getUserData(userId).update({ newsArticles: articles });
    });
    return;
  }

  updateUserEmail(email: string) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        user.updateEmail(email).then(() => {
          return;
        }).catch((err) => {
          console.log("something wong.");
        })
      }
      else {
        return;
      }
    });
  }

  editUserArticle(articleData: INewsArticle, articleId: string, userId: string) {
    let articles = [];
    let oldArticleInfo: INewsArticle;
    this.getUserData(userId).get().subscribe((user) => {
      articles = user?.data()?.newsArticles;
      oldArticleInfo = articles.find(x => x.id === articleId);
      oldArticleInfo.title = articleData.title;
      oldArticleInfo.content = articleData.content;
      this.getUserData(userId).update({ newsArticles: articles });
    });
  }

  editUserComment(commentId: string, userId: string, newContent: string) {
    let comments = [];
    let oldComment: IComment;
    this.getUserData(userId).get().subscribe((user) => {
      comments = user?.data()?.comments;
      oldComment = comments.find(x => x.id === commentId);
      oldComment.content = newContent;
      this.getUserData(userId).update({ comments: comments });
    });
  }
}

