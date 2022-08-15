import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {menuOpen} from "../store/actions/menu.action";
import {delay, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  public isStaff: boolean = false;
  public isLawFirmAuthorized: boolean = false;
  private destroyed = new Subject<void>();

  constructor(private store: Store<{menuOpen: boolean, userProfile: any}> ) {
    this.store.select('userProfile').pipe(takeUntil(this.destroyed), delay(0)).subscribe(x => {
      if (x !== undefined) {
        this.isStaff = x.userDetail.is_staff
        this.isLawFirmAuthorized = x.userDetail.lawfirm_submit_data_access
      }
    })

  }


  closeMenu() {
    this.store.dispatch(menuOpen({menuOpen: false}))
  }

  ngOnDestroy(): void{
    this.destroyed.next()
    this.destroyed.complete()
  }
}
