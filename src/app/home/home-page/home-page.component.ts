import {Component, OnInit} from '@angular/core';
import {FamEst} from "../../estimation/_models/FamEst.model";
import {combineLatest, Subscription} from "rxjs";
import {map} from "lodash";
import {FamEstService} from "../../estimation/_services/fam-est.service";
import {FamilyService} from "../../portfolio/_services/family.service";
import {Family} from "../../portfolio/_models/family.model";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  famEsts: FamEst[] = [new FamEst('')];
  famEst$ = this.famEstSer.entities$;
  family$ = this.familySer.entities$;
  famEstSub: Subscription;
  families: Family[] = [new Family()];
  pageSize = 5;

  constructor(
    private famEstSer: FamEstService,
    private familySer: FamilyService
  ) {
    this.famEstSub = combineLatest([
      this.famEst$.pipe(filter(x => x.length > 0)),
      this.family$.pipe(filter(x => x.length > 0))])
      .subscribe(
        ([famEsts, families]) => {
          this.families = families
          this.famEsts = map(famEsts, (x: FamEst) => {
            let d = families.find(y => y.id == x.id)
            return {...x, 'family_name': d?.family_name, 'family_no': d?.family_no}
          })
          return this.famEsts.sort((a, b) => {
            return Date.parse(b.date_created) - Date.parse(a.date_created)
          })
        }
      )
  }

  ngOnInit() {
    this.famEstSer.getAll()
    this.familySer.getAll()
  }


}
