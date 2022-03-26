import {Action, createReducer, on} from "@ngrx/store";
import {Country} from "../../_models/Country.model";
import {jurisdiction} from "../actions/law-firm-jurisdiction.action";


export interface JurisdictionState {
  jurisdiction: Country;
}

export const initialJurisdictionState: JurisdictionState = {
  jurisdiction: new Country()
};

const jurisdictionReducerInternal = createReducer(
  initialJurisdictionState,
  on(jurisdiction, (state, {jurisdiction}) => {
    return {
      ...state,
      jurisdiction: jurisdiction
    };
  }),
)

export function jurisdictionReducer(state: JurisdictionState| undefined, action: Action) {
  return jurisdictionReducerInternal(state, action);
}
