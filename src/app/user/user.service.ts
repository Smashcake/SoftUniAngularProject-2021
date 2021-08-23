import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { IRegisterUser } from '../interfaces/register-user';
import { ILoginUser } from '../interfaces/login-user';
import { IComment } from '../interfaces/comment';
import { INewsArticle } from '../interfaces/news-article';
import { IJournalistApplicant } from '../interfaces/journalist-applicant';
import { IMessage } from '../interfaces/message';
import { Timestamp } from 'rxjs';

@Injectable()
export class UserService {

  userCall: string = "users";
  journalistApplicantCall: string = "journalistApplicants";

  isLogged: boolean;
  userRole: string;
  userId: string;
  journalistApplicants: any[] | undefined;


  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore) {
    this.fireAuth.onAuthStateChanged((user) => {
      if (user === null) {
        this.isLogged = false;
        this.userRole = '';
      }
      else {
        this.isLogged = true;
        this.userId = user.uid;
        this.getUserData(user.uid).get().subscribe((user) => {
          this.userRole = user?.data()?.role;

        })
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
      newsArticles: userData.newsArticles,
      messages: userData.messages,
      role: userData.role
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

  applyForJournalist(userId: string, user: IJournalistApplicant) {
    this.journalistApplicants = [];
    this.firestore.collection(this.journalistApplicantCall).get().subscribe(journalistApplicantsCollection => {
      this.journalistApplicants = journalistApplicantsCollection.docs.map(applicant => {
        return {
          data: applicant.data()
        }
      })
      let journalistApplicant = this.journalistApplicants.find(x => x.data.userId == userId);

      if (journalistApplicant === undefined && user.role === 'user') {
        this.firestore.collection(this.journalistApplicantCall).add(user).then(docRef => {
          this.firestore.collection(this.journalistApplicantCall).doc(docRef.id).update({ docId: docRef.id });
        });

        let message: IMessage = {
          sender: 'Automated',
          date: new Date(),
          content: 'Successful journalist application.',
          read: false
        }
        this.addMessageToUser(userId, message);
      }
      else {
        window.alert("You already have an application.");
        return;
      }
    });
  }

  addMessageToUser(userId: string, message: IMessage) {
    let messages: IMessage[] = [];
    this.getUserData(userId).get().subscribe(userInfo => {
      messages = userInfo?.data()?.messages;
      messages.push(message);
      this.getUserData(userId).update({ messages: messages});
    })
  }

  removeMessageFromUser(userId: string, time: Date) {
    let messages: IMessage[] = [];
    let messageIndex: number;
    this.getUserData(userId).get().subscribe(userInfo => {
      messages = userInfo?.data()?.messages;
      messageIndex = messages.findIndex(message => message.date.getSeconds == time.getSeconds);

      // if (messageIndex > -1) {
      //   messages.splice(messageIndex, 1);
      // }
      this.getUserData(userId).update({ messages: messages});
    });
  }
}

