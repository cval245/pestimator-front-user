import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';


import * as userProfileActions from '../actions/userProfile.action'
import {Store} from '@ngrx/store';
import {combineLatest, EMPTY} from "rxjs";
import {UserProfileService} from "../../_services/user-profile.service";
import {UserDetailService} from "../../_services/user-detail.service";
import {loginComplete} from "../actions/auth.action";

@Injectable()
export class UserProfileEffect{
  constructor(
    private userProfileActions$: Actions,
    private userProfileSer: UserProfileService,
    private userDetSer: UserDetailService,
    private router: Router,
    private store: Store<{ userProfile: any }>,
  ) {
  }

  login$ = createEffect(() =>
    this.userProfileActions$.pipe(
      ofType(userProfileActions.get, loginComplete),
      exhaustMap(() => {
          return combineLatest([this.userProfileSer.getAll(), this.userDetSer.getAll()]).pipe(
            map(([userProfile, userDetail]) => {
              return userProfileActions.data_received({
                userProfile: userProfile[0],
                userDetail: userDetail[0]
              });
            }), catchError(() => EMPTY)
          );
        }

        //   this.authService.login(action.credentials.username,
        //     action.credentials.password)
        //     .pipe(map(profile => {
        //         return loginComplete({
        //           profile,
        //           isLoggedIn: true,
        //           refreshTimer: this.getExpTimeAccess(profile.access)
        //         })
        //       })
        //       , tap(() => this.router.navigate(['/home']))
        //       , catchError(error => {
        //         return of(loginFailure({error}))
        //       })
        //     )
        // )))
      )))

  // getExpTimeAccess(access_token: string){
  //   const jwtToken = JSON.parse(atob(access_token
  //     .split('.')[1]));
  //   const expires = new Date(jwtToken.exp * 1000)
  //   return expires
  // }

  // logout$ = createEffect(() =>
  //   this.authActions$.pipe(
  //     ofType(logout),
  //     map(() => logoutComplete())
  //   ))

  // loginFailure$ = createEffect(()=>
  //   this.authActions$.pipe(
  //     ofType(loginFailure)
  //   )
  // )

  // initStuff$ = createEffect(() =>
  //   this.authActions$.pipe(
  //     ofType(ROOT_EFFECTS_INIT),
  //     switchMap(() => this.store.select('authCred')
  //       .pipe(map(x => {
  //           if (x.profile.access.length > 0) {
  //             return refreshAccess({profile: x.profile})
  //           } else
  //             throw "ddddd error"
  //           //return logout()
  //         })
  //       ))))

  // refresh$ = createEffect(() =>
  //   this.authActions$.pipe(
  //     ofType(refreshAccess),
  //     exhaustMap(action => {
  //       let user = action.profile
  //       let a = this.authService.refreshToken_two(user.refresh)
  //         .pipe(map(access => {
  //             let user_two = new User('', '', '')
  //             user_two.access = access.access
  //             user_two.refresh = user.refresh
  //             user_two.username = user.username
  //             return refreshAccessSuccess({'profile': user_two})
  //           }), catchError(x => of(logout()))
  //         )
  //       return a
  //     })
  //   ))
  //
  // loginComplete$ = createEffect(() =>
  //   this.authActions$.pipe(
  //     ofType(loginComplete),
  //     map(action =>{
  //       return restartTimer({'refreshTimer': this.getExpTimeAccess(action.profile.access)})
  //     }),
  //   ))

  // refreshAccSuc$ = createEffect(() =>
  //   this.authActions$.pipe(
  //     ofType(refreshAccessSuccess),
  //     map(action =>{
  //       return restartTimer({'refreshTimer': this.getExpTimeAccess(action.profile.access)})
  //     }),
  //
  //   ))
  //
  // restartTimer$ = createEffect(() =>
  //   this.authActions$.pipe(
  //     ofType(restartTimer),
  //     switchMap(action => this.authService.startRefreshTokenTimer_two(action.refreshTimer)
  //       .pipe(switchMap(() => this.store.select('authCred').pipe(
  //         map(x => {
  //             return refreshAccess({profile: x.profile})
  //           }
  //         ))))
  //     )))

}
