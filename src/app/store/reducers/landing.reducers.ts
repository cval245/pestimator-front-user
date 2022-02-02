import {Action, createReducer, on} from "@ngrx/store";
import {landing} from "../actions/landing.action";


export interface LandingState {
  landing: Boolean;
}

export const initialLandingState: LandingState = {
  landing: false
};

const landingReducerInternal = createReducer(
  initialLandingState,
  on(landing, (state, {landing}) => {
    return {
      ...state,
      landing: landing
    };
  }),
)

export function landingReducer(state: LandingState | undefined, action: Action) {
  return landingReducerInternal(state, action);
}
