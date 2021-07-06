import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountService } from '../account/_services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isLoggedIn = false;
    constructor(
        private store: Store<{authCred: any}>,
        private accSer: AccountService,
    ) { }

    ngOnInit(): void {
        this.store.select('authCred').subscribe(x =>
            { this.isLoggedIn = x.isLoggedIn})
    }

    logout(){
        this.accSer.logout()
    }    

      
}
