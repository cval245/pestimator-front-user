import {createAction, props} from "@ngrx/store";
import {Country} from "../../_models/Country.model";


export const jurisdiction= createAction(
  '[jurisdiction] jurisdiction',
  props<{jurisdiction: Country}>()
)
