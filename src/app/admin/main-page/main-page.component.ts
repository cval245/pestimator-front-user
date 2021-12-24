import {Component, OnInit} from '@angular/core';
import {UserAllService} from "../../_services/user-all.service";
import {UserAll} from "../../_models/UserAll.model";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {map} from "lodash";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public userAlls: UserAll[] = [new UserAll()]
  private destroy = new Subject<void>()

  constructor(
    private userAllSer: UserAllService,
  ) {
    this.userAllSer.getAll().pipe(takeUntil(this.destroy)).subscribe(x =>{
      console.log('this.userAlls = ', this.userAlls)
      this.userAlls = map(x, y => {
        return {...y, date_joined: new Date(y.date_joined)}
      })

      console.log('this.userAlls = ', this.userAlls)
    })

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.destroy.next()
    this.destroy.complete()
  }

}
