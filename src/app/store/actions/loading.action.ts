import {createAction, props} from "@ngrx/store";


export const loading= createAction(
  '[Loading] loading',
  props<{loading: boolean}>()
)
