import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {AccountService} from '../_services/account.service';
import {menuOpen} from "../store/actions/menu.action";
import {delay} from "rxjs/operators";
import {PricingComponent} from "../content-free/pricing/pricing.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public showMenuBool: boolean = false;
  public isLoggedIn = false;
  public landingBool: boolean = false;

  @ViewChild(PricingComponent, {read: ElementRef}) private vc: PricingComponent = new PricingComponent();

  constructor(
    private store: Store<{ authCred: any, menuOpen: boolean, landing: { landing: boolean } }>,
    private accSer: AccountService,
  ) {
  }


  ngOnInit(): void {
    this.store.select('landing').pipe(delay(0)).subscribe(x => {
      if (x !== undefined) {
        this.landingBool = x.landing
      }
    })

    this.isLoggedIn = false
    this.store.select('authCred').pipe(delay(0)).subscribe(x => {
      if (x !== undefined) {
        this.isLoggedIn = x.isLoggedIn
      }
    })
    this.store.select('menuOpen').pipe(delay(0)).subscribe((x: any) => {
      if (x !== undefined) {
        this.showMenuBool = x.menuOpen
      }
    })
  }

  logout() {
    this.accSer.logout()
  }

  showMenu() {
    this.showMenuBool = !this.showMenuBool
    this.store.dispatch(menuOpen({menuOpen: this.showMenuBool}))
  }
}
