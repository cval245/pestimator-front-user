import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {Store} from "@ngrx/store";
import {takeUntil} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IsStaffLoggedInGuard implements CanActivate {

  private isStaff: Boolean = false
  private isLoggedIn: Boolean = false
  private destroyed = new Subject<void>();

  constructor(
    private store: Store<{ authCred: any, userProfile: any, }>,
    private router: Router
  ) {
    this.store.select('authCred').pipe(takeUntil(this.destroyed)).subscribe(x =>{
        this.isLoggedIn = x.isLoggedIn
    })
    this.store.select('userProfile').pipe(takeUntil(this.destroyed)).subscribe(x => {
      this.isStaff = x.userDetail.is_staff
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLoggedIn){
      if (this.isStaff){
        return true;
      } else{
        return false;
      }
    } else{
      return this.router.parseUrl('/account/login')
    }

  }
  ngOnDestroy() {
    this.destroyed.next()
    this.destroyed.complete()
  }
}
