import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  private isLoggedIn: Boolean = false

  constructor(
                private store: Store<{authCred: any}>,
                private router: Router
            ){
              this.store.select('authCred').subscribe(x => 
                this.isLoggedIn=x.isLoggedIn)

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.isLoggedIn){
        return true;
      } else{
        return this.router.parseUrl('/login')
      }
  }
  
}
