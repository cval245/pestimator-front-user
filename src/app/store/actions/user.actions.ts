import { Action, createAction, props } from '@ngrx/store';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
}

export class LogIn implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any){}
}

export type All =
    | LogIn
    | LogInSuccess;


export const login = createAction(
    '[Login Page] Login',
    props<{username: string; password: string}>()
);
