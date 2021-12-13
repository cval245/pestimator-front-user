import {Action, createReducer, on} from '@ngrx/store';
import * as userProfileActions from '../actions/userProfile.action';
import {UserProfile} from "../../account/_models/userProfile.model";
import {UserDetail} from "../../account/_models/userDetail.model";

export const authFeatureName = 'auth';

export interface UserProfileState {
  userProfile: UserProfile;
  userDetail: UserDetail;
}

export const initialUserProfileState: UserProfileState= {
  userProfile: new UserProfile(),
  userDetail: new UserDetail(),
};



const userProfileReducerInternal = createReducer(
  initialUserProfileState,
  on(userProfileActions.data_received, (state, { userProfile, userDetail,
  }) => {
    return {
      ...state,
      userProfile,
      userDetail,
    };
  }),



);

export function userProfileReducer(state: UserProfileState | undefined, action: Action) {
  return userProfileReducerInternal(state, action);
}
