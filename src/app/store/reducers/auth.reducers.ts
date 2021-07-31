import {User} from '../../account/_models/user.model';
import {Action, createReducer, on} from '@ngrx/store';
import * as authActions from '../actions/auth.action';


export const authFeatureName = 'auth';

export interface AuthState {
  profile: User;
  isLoggedIn: boolean;
  refreshTimer: Date;
}

export const initialAuthState: AuthState = {
    isLoggedIn: false,
    profile: new User('','',''),
    refreshTimer: new Date(),
};

const authReducerInternal = createReducer(
    initialAuthState,

    on(authActions.loginComplete, (state, { profile, isLoggedIn,
      refreshTimer
    }) => {
      return {
        ...state,
        profile,
        isLoggedIn: true,
        refreshTimer
      };
    }),

  on(authActions.loginFailure, (state, error) => {
    return {
      ...state,
      error
    };
  }),


  on(authActions.logout, (state) => {
    return {
      ...state,
      profile: new User('', '', ''),
      isLoggedIn: false,
      error: null
    };
  }),


    on(authActions.refreshAccessSuccess, (state, { profile }) => {
       return {
           ...state,
           profile: profile,
           isLoggedIn: true,
       };
    }),

);

export function authReducer(state: AuthState | undefined, action: Action) {
    return authReducerInternal(state, action);
}
