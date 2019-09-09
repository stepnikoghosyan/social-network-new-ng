import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

// services
import {AuthService} from '../../modules/auth/services/auth.service';

@Injectable()
export class SigninGuard implements CanActivate {
  constructor(
    private readonly router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!AuthService.isAuthenticated) {
      return true;
    }

    this.router.navigate(['/homepage']);
    return false;
  }
}
