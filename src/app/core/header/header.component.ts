import { Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLogged: boolean = false;

  constructor(private auth: AngularFireAuth, private userService: UserService, private route: Router) {
    this.auth.authState.subscribe(user => {
      this.isLogged = user?.uid ? true : false;
    });
  }

  logoutHandler() {
    this.userService.logoutUser()
    .then(x => {
      this.route.navigateByUrl("/login");
    });
  }

}
