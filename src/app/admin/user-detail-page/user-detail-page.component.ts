import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserAllService} from "../_services/user-all.service";
import {takeUntil} from "rxjs/operators";
import {clone, map} from "lodash";
import {UserAll} from "../_models/UserAll.model";
import {Subject} from "rxjs";
import {FamEstUserService} from "../_services/fam-est-user.service";
import {FamEstUser} from "../_models/FamEstUser.model";
import {UserProfileAllService} from "../_services/user-profile-all.service";
import {UserProfileAll} from "../_models/UserProfileAll.model";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.scss']
})
export class UserDetailPageComponent implements OnInit, OnDestroy {

  public userAlls: UserAll[] = [new UserAll()]
  public userAll: UserAll = new UserAll
  public userProAll: UserProfileAll = new UserProfileAll()
  public famEstUsers: FamEstUser[] = [new FamEstUser()]
  private destroy = new Subject<void>()
  public estNumFormControl = new FormControl()

  constructor(
    private route: ActivatedRoute,
    private userAllSer: UserAllService,
    private userProfAllSer: UserProfileAllService,
    private famEstUserSer: FamEstUserService,
  ) {
    console.log('this.route.snapshot.params', this.route.snapshot.params)
    let user_id = this.route.snapshot.params.id
    this.userProfAllSer.getWithQuery('user_id='+user_id).pipe(takeUntil(this.destroy)).subscribe(x => {
      console.log('x', x)
      this.userProAll = x[0]
      this.estNumFormControl.patchValue(this.userProAll.estimates_remaining)
      this.estNumFormControl.disable()
    })
    this.userAllSer.getByKey(user_id).pipe(takeUntil(this.destroy)).subscribe(x =>{
      this.userAll = x
    })
    this.famEstUserSer.getWithQuery('user_id='+user_id).pipe(takeUntil(this.destroy)).subscribe(x => {
      this.famEstUsers = map(x, y => {
        return {...y, date_created: new Date(y.date_created)}
      })
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.destroy.next()
    this.destroy.complete()
  }

  editEsts(){
    if (this.estNumFormControl.disabled){
      this.estNumFormControl.enable()
    } else{
      this.estNumFormControl.disable()
    }
  }

  onSubmit(){
    let userAllProf = clone(this.userProAll)
    userAllProf.estimates_remaining = this.estNumFormControl.value

    this.userProfAllSer.update(userAllProf).subscribe(x =>{
      this.userProAll = x
    })
  }
}
