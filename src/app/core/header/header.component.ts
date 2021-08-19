import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IJournalistApplicant } from 'src/app/interfaces/journalist-applicant';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLogged: boolean = false;
  userId: string;

  constructor(private auth: AngularFireAuth, private userService: UserService, private route: Router) {
    this.auth.authState.subscribe(user => {
      this.isLogged = user?.uid ? true : false;
      this.userId = user?.uid ? user.uid : undefined;
    });
  }

  logoutHandler() {
    this.userService.logoutUser()
      .then(x => {
        this.route.navigateByUrl("/login");
      });
  }

  journalistHandler(userId: string) {
    if (window.confirm("Are you sure you would like to apply for a journalist role?")) {
      let user: IJournalistApplicant = {
        name: '',
        surname: '',
        userId: userId,
        role: '',
        docId: ''
      };
      this.userService.getUserData(userId).get().subscribe(userInfo => {
        user.name = userInfo?.data()?.name;
        user.surname = userInfo?.data()?.surname;
        user.role = userInfo?.data()?.role;
      });

      this.userService.applyForJournalist(userId, user);
    }
  }
}
