import {createAction, props} from "@ngrx/store";


export const menuOpen= createAction(
  '[MenuOpen] menuOpen',
  props<{menuOpen: boolean}>()
)
