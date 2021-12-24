import {Action, createAction, props} from '@ngrx/store';
import {UserProfile} from "../../_models/userProfile.model";
import {UserDetail} from "../../_models/userDetail.model";

export enum AuthActionTypes {
  GET = '[userProfile] GET',
  dataReceived = '[userProfile] dataReceived'
}

export class GET implements Action {
  readonly type = AuthActionTypes.GET;
  constructor() {}
}

export class dataReceived implements Action {
  readonly type = AuthActionTypes.dataReceived;
  constructor(public payload: any) {}
}

// export class LogInSuccess implements Action {
//   readonly type = AuthActionTypes.LOGIN_SUCCESS;
//   constructor(public payload: any){}
// }

export type All =
  | GET
  | dataReceived;


export const get = createAction(
  '[userProfile] Get',
  // '[Login Page] Login',
  // props<{}>()
);
export const data_received = createAction(
  '[userProfile] dataReceived',
  props<{userProfile: UserProfile, userDetail: UserDetail}>()
)
