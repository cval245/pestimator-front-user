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
      )))



}
