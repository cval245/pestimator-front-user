import {Action, createReducer, on} from "@ngrx/store";
import {menuOpen} from "../actions/menu.action";


export interface MenuOpenState{
  menuOpen: Boolean;
}

export const initialMenuOpenState: MenuOpenState= {
  menuOpen: false
};

const menuOpenReducerInternal = createReducer(
  initialMenuOpenState,
  on(menuOpen, (state, { menuOpen }) => {
    return {
      ...state,
      menuOpen: menuOpen
    };
  }),
)

export function menuOpenReducer(state: MenuOpenState| undefined, action: Action) {
  return menuOpenReducerInternal(state, action);
}
