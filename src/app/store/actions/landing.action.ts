import {createAction, props} from "@ngrx/store";


export const landing = createAction(
  '[Landing] landing',
  props<{ landing: boolean }>()
)
