import { Injectable } from '@angular/core';
//import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, createEffect, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { of } from 'rxjs'
import { tap, map, switchMap, catchError, exhaustMap, combineLatest, concatMap, takeUntil} from 'rxjs/operators';
import {User} from '../../account/_models/user.model';
import { AccountService } from '../../account/_services/account.service';
import {
    AuthActionTypes,
    LogIn, LogInSuccess,
} from '../actions/user.actions';

import { checkAuthComplete, login, loginComplete, logoutComplete, logout,
         startTimer, refreshAccess, refreshAccessSuccess } from '../actions/auth.action';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffectsNew {
    constructor(
        private authActions$: Actions,
        private authService: AccountService,
        private router: Router,
        private store: Store<{authCred: any}>,
    ){}

    login$ = createEffect(() =>
        this.authActions$.pipe(
            ofType(login),
            exhaustMap(action =>
                this.authService.login(action.credentials.username, action.credentials.password)
                    .pipe(map(profile => loginComplete({
                        profile,
                        isLoggedIn: true,
                        refreshTimer: this.getExpTimeAccess(profile.access)})),
                          tap(() => this.router.navigate(['/home']))
                         )
                      )))

    getExpTimeAccess(access_token: string){
        console.log('access_token', access_token)
        const jwtToken = JSON.parse(atob(access_token
            .split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000)
        console.log('expires', expires)
        return expires
    }


    logout$ = createEffect(()=>
        this.authActions$.pipe(
            ofType(logout),
            exhaustMap(action => this.authService.logout()
                 .pipe(map(profile => logoutComplete()))
                
            )
        )
        )

    timer$ = createEffect(() =>
        this.authActions$.pipe(
            ofType(loginComplete),
            exhaustMap(action =>
                this.authService.startRefreshTokenTimer_two(action.refreshTimer)
                    .pipe(switchMap(() => this.authService.refreshToken_two()
                    .pipe(
                        tap(x => console.log('99999999999999999999999999999999999', x)),
                        map(access => {
                        let user_three = new User('', '', '')
                        console.log('access_three', access)
                        this.store.select('authCred').subscribe(x => {
                            user_three = x.profile
                        })
                        let user_four = new User(user_three.username,
                                                 access.access,
                                                 user_three.refresh)
                        console.log('rerere')
                        return refreshAccessSuccess({'profile': user_four})
                    }))
                                   ))
                      )
        ))

    initStuff$ = createEffect(() =>
        this.authActions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            map(action =>{
                let user = new User('','','')
                this.store.select('authCred').subscribe(x => {
                    user=x.profile
                })
                return refreshAccess({'profile': user,
                                      'refreshTimer': this.getExpTimeAccess(user.access)})
            }
            )))


    restartTimer$ = createEffect(() =>
        this.authActions$.pipe(
            ofType(refreshAccess),
            switchMap(action =>
                this.authService.startRefreshTokenTimer_two(action.refreshTimer)
                    .pipe(takeUntil(this.authActions$.pipe(ofType(logout))))
                    .pipe(exhaustMap(() => this.authService.refreshToken_two()
                    .pipe(
                        map(access => {
                        let user_two = new User('', '', '')
                        this.store.select('authCred').subscribe(x => {
                            user_two=x.profile
                        })
                        //user_two.access = access.access
                        //action.profile.access
                        let user_five = new User(user_two.username,
                                                 access.access,
                                                 user_two.refresh)
                            return refreshAccessSuccess({'profile': user_five})
                    }), catchError(() => of(logout()))
                        )
                    // ,
                    // catchError(err => {
                    //     return of({'access': ''})
                    // })
                    )))
        ))
    refreshAccSuc$ = createEffect(() =>
        this.authActions$.pipe(
            ofType(refreshAccessSuccess),
            map(action =>{
                return refreshAccess({'profile': action.profile,
                                      'refreshTimer': this.getExpTimeAccess(action.profile.access)})
            })
        )
                                 )

}
@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private authService: AccountService,
        private router: Router,
    ) {}

    @Effect()
    LogIn: Observable<any> = this.actions
        .pipe(ofType(AuthActionTypes.LOGIN),
              map((action: LogIn) => action.payload),
              switchMap(payload  => {
                  return this.authService.login(payload.email, payload.password)
                      .pipe(map((user) => {
                          console.log(user);
                          return new LogInSuccess({token: user.token, email: payload.email});
                      }))
                      // .pipe(catchError((error) => {
                      //     console.log(error);
                      //     return of(new LogInFailure({ error: error }));
                      // }));
              })
             )


    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((user: User) => {
            //localStorage.setItem('access', user?.payload.access ?? '');
            //localStorage.setItem('refresh', user.payload.refresh);
            //localStorage.setItem('username', user.payload.username);
            localStorage.setItem('access', user?.access ?? '');
            localStorage.setItem('refresh', user?.refresh ?? '');
            localStorage.setItem('username', user?.username ?? '');

            this.router.navigateByUrl('/');
        })
    );
}
