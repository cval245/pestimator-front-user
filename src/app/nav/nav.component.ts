import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {menuOpen} from "../store/actions/menu.action";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private store: Store<{menuOpen: boolean}> ) { }


  closeMenu() {
    this.store.dispatch(menuOpen({menuOpen: false}))
  }
}
