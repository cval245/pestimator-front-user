import {Action, ActionReducer, MetaReducer} from '@ngrx/store';
import {cloneDeep, merge, pick} from 'lodash';
import {logout} from "./actions/auth.action";

function setSavedState(state: any, localStorageKey: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}
function getSavedState(localStorageKey: string): any {
  return JSON.parse(localStorage.getItem(localStorageKey)!);
}

// the keys from state which we'd like to save.
const stateKeys = ['authCred.profile', 'authCred.isLoggedIn', 'authCred.refreshTimer',
  'userProfile.userProfile', 'userProfile.userDetail'
];
// the key for the local storage.
const localStorageKey = '__app_storage__';

export function storageMetaReducer<S, A extends Action = Action> (reducer: ActionReducer<S, A>) {
  let onInit = true; // after load/refresh…
  return function(state: S, action: A): S {
    // reduce the nextState.
    const nextState = reducer(state, action);
    // init the application state.
    if (onInit) {
      onInit           = false;
      const savedState = getSavedState(localStorageKey);
      return merge(cloneDeep(nextState), savedState);
    }
    // save the next state to the application storage.
    const stateToSave = pick(nextState, stateKeys);
    setSavedState(stateToSave, localStorageKey);
    return nextState;
  };
}
export function clearOnLogoutMetaReducer<S, A extends Action=Action>(reducer: ActionReducer<S,A>){
  return function(state: S, action: A): S{
    if(action.type === logout.type){
      return reducer(undefined, action);
    }
    return reducer(state, action)
  }
}

export const metaReducers: MetaReducer<any>[] = [storageMetaReducer, clearOnLogoutMetaReducer];
