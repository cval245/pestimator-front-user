import {createAction, props} from "@ngrx/store";
import {APPL_VERSIONS} from "../../estimation/enums";
import {CustomApplDetails} from "../../estimation/_models/CustomApplDetails.model";
import {CustomApplOptions} from "../../estimation/_models/CustomApplOptions.model";
import {Country} from "../../characteristics/_models/Country.model";
import {ApplType} from "../../characteristics/_models/applType.model";


export const createCustomApplDetails = createAction(
  '[createCustomApplDetails] createCustomApplDetails',
  props<{
    applVersion: APPL_VERSIONS,
    country: Country,
    appl_type: ApplType,
    customDetails: CustomApplDetails,
    customOptions: CustomApplOptions,
  }>()
)
