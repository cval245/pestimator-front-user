import { createAction, props } from '@ngrx/store';
import { Credentials } from 'src/app/account/_models/credentials.model';
import { RefreshModel } from 'src/app/account/_models/TimerRefresh.model';
import { User } from 'src/app/account/_models/user.model';

export const checkAuth = createAction('[Auth] checkAuth');
export const checkAuthComplete = createAction(
    '[Auth] checkAuthComplete',
    props<{ isLoggedIn: boolean }>()
);
export const login = createAction('[Auth] login', props<{credentials: Credentials}>());
export const loginComplete = createAction(
    '[Auth] loginComplete',
    props<{ profile: any; isLoggedIn: boolean; refreshTimer: Date; }>()
);
export const logout = createAction('[Auth] logout');
export const logoutComplete = createAction('[Auth] logoutComplete');

export const startTimer = createAction('[Auth] startTimer', 
                props<{refreshModel: RefreshModel}>())
//export const refreshAccess = createAction('[Auth] refreshAccess')
export const refreshAccess = createAction('[Auth] refreshAccess', 
                props<{profile: User;}>())


export const restartTimer = createAction('[Auth] restartTimer', 
                                props<{refreshTimer: Date;}>())
export const refreshAccessSuccess = createAction('[Auth] refreshAccessSuccess',
                                                 props<{profile: User;}>())
