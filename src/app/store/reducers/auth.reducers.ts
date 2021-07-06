import { User } from '../../account/_models/user.model';
import { AuthActionTypes, All } from '../actions/user.actions';
import { Action, createReducer, on } from '@ngrx/store';
import * as authActions from '../actions/auth.action';


// export interface State {
//     // is a user authenticated?
//     isAuthenticated: boolean;
//     // if authenticated, there should be a user object
//     user: User | null;
//     // error message
//     errorMessage: string | null;
// }
// export const initialState: State = {
//     isAuthenticated: false,
//     user: null,
//     errorMessage: null
// };

// const superReducer = createReducer(
//     initialState,
// )
// export function reducer(state: State | undefined, action: Action) {
//     return superReducer(state, action)
// }




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

// export interface CredentialState {
//     credentials: any;
// }

// export const initialCredentialState: CredentialState ={
//     credentials: null,
// }


// export const authCredentialReducer = createReducer(
//     initialCredentialState,
//     on(authActions.login, (state, {credentials}) => {
//         return {
//             ...state,
//             credentials
//         }
//     }),

// )

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
    on(authActions.logout, (state, {}) => {
        return {
            ...state,
            profile: new User('','',''),
            isLoggedIn: false,
        };
    }),
    on(authActions.refreshAccess, (state, {profile, refreshTimer})=> {
       return {
           ...state,
           profile,
           isLoggedIn: true,
           refreshTimer,
       };
    }),
);

export function authReducer(state: AuthState | undefined, action: Action) {
    return authReducerInternal(state, action);
}
