import {Action, createReducer, on} from "@ngrx/store";
import {loading} from "../actions/loading.action";


export interface LoadingState {
  loading: Boolean;
}

export const initialLoadingState: LoadingState = {
  loading: false
};

const loadingReducerInternal = createReducer(
  initialLoadingState,
  on(loading, (state, { loading }) => {
    return {
      ...state,
      loading: loading
    };
  }),
)

export function loadingReducer(state: LoadingState| undefined, action: Action) {
  return loadingReducerInternal(state, action);
}
