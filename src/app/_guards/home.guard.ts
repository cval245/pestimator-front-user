import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {Store} from "@ngrx/store";
import {takeUntil} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate, OnDestroy {
  private isLoggedIn: Boolean = false
  private destroyed = new Subject<void>();

  constructor(
    private store: Store<{ authCred: any }>,
    private router: Router
  ) {
    this.store.select('authCred').pipe(takeUntil(this.destroyed)).subscribe(x =>
      this.isLoggedIn = x.isLoggedIn)
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLoggedIn) {
      return this.router.parseUrl('/home')
    } else {
      return true;
    }
  }

  ngOnDestroy() {
    this.destroyed.next()
    this.destroyed.complete()
  }
}
