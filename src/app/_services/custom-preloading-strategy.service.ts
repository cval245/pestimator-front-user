import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from "@angular/router";
import {Observable, of, timer} from "rxjs";
import {mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingStrategyService implements PreloadingStrategy {

  constructor() {
  }

  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if (route.data && route.data.preload) {
      let delay = 500
      return timer(delay).pipe(mergeMap(() => fn()))
    }
    return of(null);
  }
}
