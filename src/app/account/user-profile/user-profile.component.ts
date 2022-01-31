import {Component, OnInit} from '@angular/core';

import {UserProfile} from '../../_models/userProfile.model';
import {UserProfileService} from '../../_services/user-profile.service';
import {toPairs} from 'lodash';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userProfile: UserProfile;
  public userProfArr: any
  public displayedColumns: string[] = ['key', 'value']


  constructor(
    private userProfSer: UserProfileService,
    private router: Router
  ) {
    this.userProfile = new UserProfile()
    this.userProfArr = []
    this.userProfSer.getAll().subscribe(x =>{
      this.userProfile=x[0]
      this.userProfArr = toPairs(this.userProfile)
    })
  }

  ngOnInit(): void {
  }

  onSubmit(formData: UserProfile){
    if (formData.id == undefined) {
      this.userProfSer.add(formData).subscribe(x => this.router.navigateByUrl('/home'))
    } else {
      this.userProfSer.update(formData).subscribe(x => this.router.navigateByUrl('/home'))
    }
    // if(formData.id == undefined){
    //   this.userProfSer.add(formData).subscribe(x => this.router.navigateByUrl('/account/buy-new-estimate'))
    // } else{
    //   this.userProfSer.update(formData).subscribe(x => this.router.navigateByUrl('/account/buy-new-estimate'))
    // }
  }
}

