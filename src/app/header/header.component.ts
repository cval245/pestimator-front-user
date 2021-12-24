import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AccountService} from '../_services/account.service';
import {menuOpen} from "../store/actions/menu.action";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public showMenuBool: boolean = false;
    isLoggedIn = false;
    constructor(
        private store: Store<{authCred: any, menuOpen: boolean}>,
        private accSer: AccountService,
    ) { }

    ngOnInit(): void {
        this.store.select('authCred').pipe(delay(0)).subscribe(x =>
            { this.isLoggedIn = x.isLoggedIn})
      this.store.select('menuOpen').pipe(delay(0)).subscribe((x:any) =>
      this.showMenuBool=x.menuOpen)
    }

    logout(){
        this.accSer.logout()
    }

  showMenu() {
    this.showMenuBool = !this.showMenuBool
    this.store.dispatch(menuOpen({menuOpen: this.showMenuBool}))
  }
}
