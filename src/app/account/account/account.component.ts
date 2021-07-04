import { Component, OnInit } from '@angular/core';

import { UserProfile } from '../_models/userProfile.model';
import { UserProfileService } from '../_services/user-profile.service';
import { toPairs } from 'lodash';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    isDisabled = false;
    public userProfile: UserProfile;
    public userProfArr: any
    public displayedColumns: string[] = ['key', 'value']

    constructor(
        private userProfSer: UserProfileService,
    ) {
        this.userProfile = new UserProfile()
        this.userProfArr = []
        this.userProfSer.getAll().subscribe(x =>{
            this.userProfile=x[0]
            this.userProfArr = toPairs(this.userProfile)
            console.log('ddd', this.userProfArr)
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
