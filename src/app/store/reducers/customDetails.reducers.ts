import {Action, createReducer, on} from "@ngrx/store";
import {APPL_VERSIONS} from "../../estimation/enums";
import {CustomApplDetails} from "../../estimation/_models/CustomApplDetails.model";
import {createCustomApplDetails} from "../actions/customDetails.action"
import {filter} from "lodash";
import {CustomApplOptions} from "../../estimation/_models/CustomApplOptions.model";

export interface CustomDetails{
  applVersion: APPL_VERSIONS;
  country_id: number;
  customDetails: CustomApplDetails;
  customOptions: CustomApplOptions;
}
export const CustomDetailsState: Array<CustomDetails> = [{
  applVersion: APPL_VERSIONS.PCT_APPL,
  country_id: 0,
  customDetails:new CustomApplDetails(),
  customOptions: new CustomApplOptions()
}];


export const initialCustomDetails: Array<CustomDetails>= [{
  applVersion: APPL_VERSIONS.PCT_APPL,
  country_id: 0,
  customDetails: new CustomApplDetails(),
  customOptions: new CustomApplOptions(),
}];

const customDetailsReducerInternal = createReducer(
  initialCustomDetails,
  on(createCustomApplDetails, (state, {applVersion, country_id, customDetails, customOptions  }) => {
      let filtered_state = filter(state, x => {
        return !(country_id == x.country_id && applVersion == x.applVersion)
      })
    return [...filtered_state, {
      applVersion: applVersion,
      country_id: country_id,
      customDetails: customDetails,
      customOptions: customOptions,
    }];
  }),
)

export function customDetailsReducer(state: Array<CustomDetails>| undefined, action: Action) {
  return customDetailsReducerInternal(state, action);
}
