import {Injectable} from '@angular/core';
// import { selectUser } from '../../store/index';
// import { AppState } from '../../store/app.states';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from '../_models/user.model';
import {Store} from '@ngrx/store';
import {AccountService} from '../_services/account.service';
import {Router} from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private accountService: AccountService,
    private router: Router,
    private store: Store<{ authCred: any }>,
  ) {
  }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        var user = new User('', '','' );
        var isLoggedIn = true;
        let bob$ = this.store.select('authCred')
        bob$.subscribe(x => {
            user = x.profile
          isLoggedIn = x.isLoggedIn
        })

      if (isLoggedIn) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${user.access}`
          }
        });
      }
      return next.handle(request)
        .pipe(
          catchError((er: HttpErrorResponse) => {
            // if(er.status === 401){
            //     this.accountService.logout()
            // }
            console.log('er', er)
            if (er.status === 404) {
              this.router.navigate(['/not-found'])
            }
            //return EMPTY //of(er);
            //return of(er.error);

            return throwError(er);

          }));
    }
}
