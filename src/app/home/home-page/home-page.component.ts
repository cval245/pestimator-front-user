import {Component, OnInit} from '@angular/core';
import {FamEst} from "../../estimation/_models/FamEst.model";
import {combineLatest, Subscription} from "rxjs";
import {map} from "lodash";
import {FamEstService} from "../../estimation/_services/fam-est.service";
import {FamilyService} from "../../portfolio/_services/family.service";
import {Family} from "../../portfolio/_models/family.model";
import {filter} from "rxjs/operators";
import {Router} from "@angular/router";
import {FamEstForm} from "../../estimation/_models/FamEstForm.model";
import {FamEstFormService} from "../../estimation/_services/fam-est-form.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  famEsts: FamEst[] = [new FamEst('')];
  famEst$ = this.famEstSer.entities$;
  family$ = this.familySer.entities$;
  famEstFormData$ = this.famEstFormDataSer.entities$;
  famEstSub: Subscription;
  families: Family[] = [new Family()];
  pageSize = 5;
  famEstFormData = [new FamEstForm('',
    '', 0, '', 0, 0,
    0, 0, 0, 0, 0, 0,
    false, 0, 0, '', false, 0, 0, 0, 0)];

  constructor(
    private famEstSer: FamEstService,
    private familySer: FamilyService,
    private famEstFormDataSer: FamEstFormService,
    private router: Router,
  ) {

    this.famEstSub = combineLatest([
      this.famEst$.pipe(filter(x => x.length > 0)),
      this.family$.pipe(filter(x => x.length > 0)),
      this.famEstFormData$.pipe(filter(x => x.length > 0))
    ])
      .subscribe(
        ([famEsts, families, fameEstFormData]) => {
          this.families = families
          this.famEstFormData = fameEstFormData
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
    this.famEstFormDataSer.getAll()
  }

  seeDetails(id: number) {
    // find udn for id
    let famEstFormData = this.famEstFormData.find(x => x.id == id)
    let udn = famEstFormData!.unique_display_no
    this.router.navigate(['/estimation/estimations/' + udn])
  }
}
