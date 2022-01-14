import {Action, createReducer, on} from "@ngrx/store";
import {APPL_VERSIONS} from "../../estimation/enums";
import {CustomApplDetails} from "../../_models/CustomApplDetails.model";
import {createCustomApplDetails} from "../actions/customDetails.action"
import {filter} from "lodash";
import {CustomApplOption} from "../../_models/CustomApplOptions.model";
import {Country} from "../../_models/Country.model";
import {ApplType} from "../../_models/applType.model";

export interface CustomDetails {
  appl_version: APPL_VERSIONS;
  country: Country;
  appl_type: ApplType;
  customDetails: CustomApplDetails;
  customOptions: CustomApplOption;
}

export const CustomDetailsState: Array<CustomDetails> = [{
  appl_version: APPL_VERSIONS.PCT_APPL,
  country: new Country,
  appl_type: new ApplType,
  customDetails: new CustomApplDetails(),
  customOptions: new CustomApplOption()
}];


export const initialCustomDetails: Array<CustomDetails>= [{
  appl_version: APPL_VERSIONS.PCT_APPL,
  country: new Country,
  appl_type: new ApplType,
  customDetails: new CustomApplDetails(),
  customOptions: new CustomApplOption(),
}];

const customDetailsReducerInternal = createReducer(
  initialCustomDetails,
  on(createCustomApplDetails, (state, {appl_version, country, appl_type, customDetails, customOptions}) => {
    let filtered_state = filter(state, x => {
      return !(country == x.country && appl_version == x.appl_version && appl_type == x.appl_type)
    })
    return [...filtered_state, {
      appl_version: appl_version,
      country: country,
      appl_type: appl_type,
      customDetails: customDetails,
      customOptions: customOptions,
    }];
    // let filtered_state = filter(state, x => {
    //   return !(country == x.country && appl_version == x.appl_version)
    // })
    // return [...filtered_state, {
    //   appl_version: appl_version,
    //   country: country,
    //   appl_type: appl_type,
    //   customDetails: customDetails,
    //   customOptions: customOptions,
    // }];
  }),
)

export function customDetailsReducer(state: Array<CustomDetails>| undefined, action: Action) {
  return customDetailsReducerInternal(state, action);
}
