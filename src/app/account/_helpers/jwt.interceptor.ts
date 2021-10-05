import {Injectable} from '@angular/core';
// import { selectUser } from '../../store/index';
// import { AppState } from '../../store/app.states';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, takeUntil} from 'rxjs/operators';
import {User} from '../_models/user.model';
import {Store} from '@ngrx/store';
import {AccountService} from '../_services/account.service';
import {Router} from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private destroyed = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private router: Router,
    private store: Store<{ authCred: any }>,
  ) {
  }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        var user = new User('', '','' );
        var isLoggedIn = true;
        this.store.select('authCred').pipe(takeUntil(this.destroyed)).subscribe(x => {
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
            if (er.status === 404) {
              this.router.navigate(['/not-found'])
            }
            return throwError(er);
          }));
    }
    ngOnDestroy(){
      this.destroyed.next()
      this.destroyed.complete()
    }
}
