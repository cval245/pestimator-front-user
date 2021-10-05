import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {loading} from "../../store/actions/loading.action";
import {environment} from "../../../environments/environment";

@Injectable()
export class LoadingScreenInterceptor implements HttpInterceptor {
  activeRequests: number = 0;
  skipUrls = [
    'auth/jwt/refresh/',
    'retrieve-username/',
  ]
  constructor(private store: Store<{loading: boolean}>) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let displayLoadingScreen = true;
    for (const skipUrl of this.skipUrls) {
      if (new RegExp(environment.API_URL + skipUrl).test(request.url)) {
        displayLoadingScreen = false;
        break;
      }
    }
    if (displayLoadingScreen) {
      if (this.activeRequests === 0) {
        setTimeout(() =>
        {
          if(this.activeRequests === 0){
            console.log('sdf')
          } else {
            this.store.dispatch(loading({loading: true}))
        }}, 200)
        // start loading
      }
      this.activeRequests++
      return next.handle(request).pipe(
        finalize(() => {
          this.activeRequests--;
          if (this.activeRequests === 0) {
            this.store.dispatch(loading({loading: false}))
            // stop loading
          }
        })
      )

    } else{
      return next.handle(request)
    }

  }
}
