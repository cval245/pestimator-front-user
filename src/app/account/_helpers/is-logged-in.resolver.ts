import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInResolver implements Resolve<boolean> {
  constructor(private store: Store<{ authCred: any }>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select('authCred')
  }
}
