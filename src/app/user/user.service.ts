import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { IRegisterUser } from '../interfaces/register-user';
import { ILoginUser } from '../interfaces/login-user';
import { IComment } from '../interfaces/comment';

@Injectable()
export class UserService {

  userCall = "users";

  constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  registerUser(registerData: IRegisterUser){
    return this.fireAuth.createUserWithEmailAndPassword(registerData.email, registerData.password);
  }

  addUserToDB(userId, userData: IRegisterUser){
    this.firestore.collection(this.userCall).doc(userId).set({
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      createdOn: userData.createdOn
    })
  };

  loginUser(loginData: ILoginUser){
    return this.fireAuth.signInWithEmailAndPassword(loginData.email, loginData.password);
  }

  logoutUser(){
    return this.fireAuth.signOut();
  }

  getUserData(id: string): AngularFirestoreDocument{
    return this.firestore.collection(this.userCall).doc(id);
  }

  addCommentToUserComments(userId: string, comment: IComment): Promise<any>{
    let currentUser: any = {};
    let comments = [];
    this.getUserData(userId).get().subscribe(user => {
      currentUser = user.data();
      comments = currentUser?.comments === undefined ? [] : currentUser.comments;
      comments.push(comment);
      this.getUserData(userId).update({ comments: comments});
    });
    return ;
  }
}

