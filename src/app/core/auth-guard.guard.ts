import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthActive implements CanActivate {

  constructor(
    private userService: UserService,
    private route: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { authenticationRequired, authenticationFailureRedirectUrl, authenticationRole } = route.data;
    if (
      typeof authenticationRequired === 'boolean' &&
      authenticationRequired === this.userService.isLogged &&
      authenticationRole.includes(this.userService.userRole)
    ) { return true; }

    let authRedirectUrl = authenticationFailureRedirectUrl;
    if (authenticationRequired) {
      const loginRedirectUrl = route.url.reduce((acc, s) => `${acc}/${s.path}`, '');
      authRedirectUrl += `?redirectUrl=${loginRedirectUrl}`;
    }

    return this.route.parseUrl(authRedirectUrl || '/');
  }

}
