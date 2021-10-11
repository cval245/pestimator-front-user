import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {FamEst} from '../_models/FamEst.model';
import {FamEstService} from '../_services/fam-est.service';
import {FamilyService} from 'src/app/portfolio/_services/family.service';
import {Family} from 'src/app/portfolio/_models/family.model';
import {map} from 'lodash';
import {FamEstFormService} from "../_services/fam-est-form.service";
import {FamEstForm} from "../_models/FamEstForm.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-family-estimate-main',
  templateUrl: './family-estimate-main.component.html',
  styleUrls: ['./family-estimate-main.component.scss']
})
export class FamilyEstimateMainComponent implements OnInit {

  loading$: Observable<boolean>;
  famEst$: Observable<FamEst[]>;
  family$: Observable<Family[]>
  famEstFormData$: Observable<FamEstForm[]>
  famEsts: FamEst[];
  families: Family[];
  famEstFormData: FamEstForm[];
  famEstSub: Subscription;

  constructor(
    private famEstSer: FamEstService,
    private familySer: FamilyService,
    private famEstFormDataSer: FamEstFormService,
    private router: Router,
  ) {
    this.famEsts = [new FamEst('')]
    this.families = [new Family()]
    this.famEstFormData = [new FamEstForm('',
      '', 0, '', 0, 0,
      0, 0, 0, 0, 0, 0,
      false, 0, 0, '', false, 0, 0, 0, 0)];
    this.loading$ = famEstSer.loading$;
    this.famEst$ = famEstSer.entities$;
    this.family$ = familySer.entities$;
    this.famEstFormData$ = this.famEstFormDataSer.entities$;

    this.famEstSub = combineLatest([this.famEst$, this.family$, this.famEstFormData$])
      .subscribe(
        ([famEsts, families, famEstFormData],) => {
          this.families = families
          this.famEstFormData = famEstFormData
          this.famEsts = map(famEsts, (x: FamEst) => {
            let d = families.find(y => y.id == x.id)
            return {
              ...x, 'family_name': d?.family_name,
              'family_no': d?.family_no
            }
          })
        }
        )
    }

  ngOnInit(): void {
    this.famEstSer.getAll();
    this.familySer.getAll();
    this.famEstFormDataSer.getAll();
  }

  ngOnDestroy() {
    this.famEstSub.unsubscribe()
  }

    add(famEst: FamEst){
        this.famEstSer.add(famEst);
    }

  delete(famEst: FamEst) {
    this.famEstSer.delete(famEst)
  }

  update(famEst: FamEst) {
    this.famEstSer.update(famEst)
  }

  seeDetails(id: number) {
    // find udn for id
    let famEstFormData = this.famEstFormData.find(x => x.id == id)
    let udn = famEstFormData!.unique_display_no
    this.router.navigate(['/estimation/estimations/' + udn])
  }
}
