import {Component, OnInit} from '@angular/core';

import {AccountService} from '../_services/account.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    constructor(private accService: AccountService) { }

    ngOnInit(): void {
        //this.accService.logout()
  }

}
