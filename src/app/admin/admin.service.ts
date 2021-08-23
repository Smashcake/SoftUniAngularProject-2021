import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable()
export class AdminService {

  applicantsCall: string = 'journalistApplicants';

  constructor(private firestore: AngularFirestore) { }

  journalistApplicants(): AngularFirestoreCollection {
    return this.firestore.collection(this.applicantsCall);
  }

}
