import {Action, createReducer, on} from "@ngrx/store";
import {APPL_VERSIONS} from "../../estimation/enums";
import {CustomApplDetails} from "../../_models/CustomApplDetails.model";
import {createCustomApplDetails} from "../actions/customDetails.action"
import {filter} from "lodash";
import {CustomApplOptions} from "../../_models/CustomApplOptions.model";
import {Country} from "../../_models/Country.model";
import {ApplType} from "../../_models/applType.model";

export interface CustomDetails {
  applVersion: APPL_VERSIONS;
  country: Country;
  appl_type: ApplType;
  customDetails: CustomApplDetails;
  customOptions: CustomApplOptions;
}

export const CustomDetailsState: Array<CustomDetails> = [{
  applVersion: APPL_VERSIONS.PCT_APPL,
  country: new Country,
  appl_type: new ApplType,
  customDetails: new CustomApplDetails(),
  customOptions: new CustomApplOptions()
}];


export const initialCustomDetails: Array<CustomDetails>= [{
  applVersion: APPL_VERSIONS.PCT_APPL,
  country: new Country,
  appl_type: new ApplType,
  customDetails: new CustomApplDetails(),
  customOptions: new CustomApplOptions(),
}];

const customDetailsReducerInternal = createReducer(
  initialCustomDetails,
  on(createCustomApplDetails, (state, {applVersion, country, appl_type, customDetails, customOptions}) => {
    let filtered_state = filter(state, x => {
      return !(country == x.country && applVersion == x.applVersion)
    })
    return [...filtered_state, {
      applVersion: applVersion,
      country: country,
      appl_type: appl_type,
      customDetails: customDetails,
      customOptions: customOptions,
    }];
  }),
)

export function customDetailsReducer(state: Array<CustomDetails>| undefined, action: Action) {
  return customDetailsReducerInternal(state, action);
}
