import {createAction, props} from "@ngrx/store";


export const loading= createAction(
  '[Loading] loading',
  props<{loading: boolean}>()
)
// export const loadingTrue = createAction(
//   '[Loading] loadingTrue',
//   props<{loading: true}>()
// )
// export const loadingFalse = createAction(
//   '[Loading] loadingFalse',
//   props<{loading: false}>()
// )
