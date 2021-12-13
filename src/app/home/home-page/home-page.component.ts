import {Component, OnInit} from '@angular/core';
import {FamEst} from "../../estimation/_models/FamEst.model";
import {combineLatest, Observable, Subscription} from "rxjs";
import {map} from "lodash";
import {FamEstService} from "../../estimation/_services/fam-est.service";
import {FamilyService} from "../../portfolio/_services/family.service";
import {Family} from "../../portfolio/_models/family.model";
import {filter} from "rxjs/operators";
import {Router} from "@angular/router";
import {CountryService} from "../../characteristics/_services/country.service";
import {ApplTypeService} from "../../characteristics/_services/appl-type.service";
import {Country} from "../../characteristics/_models/Country.model";
import {ApplType} from "../../characteristics/_models/applType.model";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  famEsts: FamEst[] = [new FamEst('')];

  private cmbSub: Subscription;
  families: Family[] = [new Family()];
  pageSize = 5;
  countries: Country[] = [new Country]
  applTypes: ApplType[] = [new ApplType]
  private famEst$: Observable<FamEst[]> = this.famEstSer.entities$.pipe(filter(x => x.length > 0));
  private family$: Observable<Family[]> = this.familySer.entities$.pipe(filter(x => x.length > 0));


  constructor(
    private famEstSer: FamEstService,
    private familySer: FamilyService,
    private countrySer: CountryService,
    private applTypeSer: ApplTypeService,
    private router: Router,
  ) {
    this.cmbSub = combineLatest([this.famEst$, this.family$ ]).subscribe(([famEsts, families ])=>{
      this.families = families
      this.famEsts = map(famEsts, (x: FamEst) => {
        let d = families.find(y => y.id == x.id)
        return {
          ...x, 'family_name': d?.family_name,
          'family_no': d?.family_no
        }
      })
      this.famEsts.sort((a, b) => {
        return Date.parse(b.date_created) - Date.parse(a.date_created)
      })
    })
  }

  ngOnInit() {
    this.famEstSer.getAll()
    this.familySer.getAll()
  }
  ngOnDestroy(){
    this.cmbSub.unsubscribe()
  }
  seeDetails(famestformdata_id: number) {
    // find udn for id
    let family = this.families.find(x => x.famestformdata == famestformdata_id)
    if (family){
      let udn = family.fam_est_form_data_udn
      this.router.navigate(['/estimation/estimations/' + udn])
    }else{
      this.router.navigate(['/not-found'])
    }
  }
}
