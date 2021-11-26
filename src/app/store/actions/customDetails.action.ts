import {createAction, props} from "@ngrx/store";
import {APPL_VERSIONS} from "../../estimation/enums";
import {CustomApplDetails} from "../../estimation/_models/CustomApplDetails.model";
import {CustomApplOptions} from "../../estimation/_models/CustomApplOptions.model";


export const createCustomApplDetails= createAction(
  '[createCustomApplDetails] createCustomApplDetails',
  props<{
    applVersion: APPL_VERSIONS,
    country_id: number,
    customDetails: CustomApplDetails,
    customOptions: CustomApplOptions,
  }>()
)
