import {Component, OnInit} from '@angular/core';
import {UserProfileService} from "../_services/user-profile.service";
import {UserProfile} from "../_models/userProfile.model";

@Component({
  selector: 'app-buy-new-estimate',
  templateUrl: './buy-new-estimate.component.html',
  styleUrls: ['./buy-new-estimate.component.scss']
})
export class BuyNewEstimateComponent implements OnInit {

  public userProfile: UserProfile

  constructor(private userProfileSer: UserProfileService) {
    this.userProfile = new UserProfile()
  }

  ngOnInit(): void {
    this.userProfileSer.getAll().subscribe(x => this.userProfile = x[0])
  }


}
