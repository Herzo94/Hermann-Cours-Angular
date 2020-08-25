import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardGuard implements CanActivate {


  constructor(private router: Router, private auth: AuthService) { }
 //Laisse que passer sur les pages qui ne sont pas login
  async canActivate():  Promise<boolean>  {
    await this.auth.checkAuth();
    
    (this.auth.isAuth)
    ? this.router.navigate(['/reservations'])
    : null;
    return !this.auth.isAuth;
  }

  

  //Ne laisse pas passer (que sur les pages login)
  
}
