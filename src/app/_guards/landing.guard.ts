import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {Store} from "@ngrx/store";
import {landing} from "../store/actions/landing.action";

@Injectable({
  providedIn: 'root'
})
export class LandingGuard implements CanActivate, OnDestroy {

  private destroyed = new Subject<void>();

  constructor(
    private store: Store<{ landing: boolean }>,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (route.url.toString() === '') {
      this.store.dispatch(landing({landing: true}))
    } else {
      this.store.dispatch(landing({landing: false}))
    }
    return true;
  }

  ngOnDestroy() {
    this.destroyed.next()
    this.destroyed.complete()
  }


}
