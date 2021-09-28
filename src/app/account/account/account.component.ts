import {Component, OnInit} from '@angular/core';

import {UserProfile} from '../_models/userProfile.model';
import {UserProfileService} from '../_services/user-profile.service';
import {toPairs} from 'lodash';
import {UserDetailService} from "../_services/user-detail.service";
import {UserDetail} from "../_models/userDetail.model";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    isDisabled = false;
    public userProfile: UserProfile;
    public userProfArr: any
    public userDetail: UserDetail = new UserDetail(0,'','')
    public displayedColumns: string[] = ['key', 'value']

    constructor(
        private userProfSer: UserProfileService,
        private userDetailSer: UserDetailService,
    ) {
        this.userProfile = new UserProfile()
        this.userProfArr = []
        this.userProfSer.getAll().subscribe(x =>{
            this.userProfile=x[0]
            this.userProfArr = toPairs(this.userProfile)
        })
      this.userDetailSer.getAll().subscribe(x =>{
        this.userDetail=x[0]
      })
    }

    ngOnInit(): void {
    }
    disabled(){
        this.isDisabled = true;
    }
    onDeactivate(event: any){
        this.isDisabled = false;
    }
    onSubmit(formData: UserProfile){
        if(formData.id == undefined){
            this.userProfSer.add(formData)
        } else{
            this.userProfSer.update(formData)
        }
    }
}
