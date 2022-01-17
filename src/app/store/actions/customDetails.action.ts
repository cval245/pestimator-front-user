import {createAction, props} from "@ngrx/store";
import {APPL_VERSIONS} from "../../estimation/enums";
import {CustomApplDetails} from "../../_models/CustomApplDetails.model";
import {CustomApplOption} from "../../_models/CustomApplOptions.model";
import {Country} from "../../_models/Country.model";
import {ApplType} from "../../_models/applType.model";


export const createCustomApplDetails = createAction(
  '[createCustomApplDetails] createCustomApplDetails',
  props<{
    appl_version: APPL_VERSIONS,
    country: Country,
    appl_type: ApplType,
    customDetails: CustomApplDetails,
    customOptions: CustomApplOption,
  }>()
)
