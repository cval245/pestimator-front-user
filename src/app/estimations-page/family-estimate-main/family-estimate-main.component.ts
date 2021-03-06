import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {FamEst} from '../../_models/FamEst.model';
import {FamEstService} from '../../_services/fam-est.service';
import {FamilyService} from 'src/app/_services/family.service';
import {Family} from 'src/app/_models/family.model';
import {map} from 'lodash';
import {Router} from "@angular/router";
import {CountryService} from "../../_services/country.service";
import {ApplTypeService} from "../../_services/appl-type.service";
import {EntitySizeService} from "../../_services/entity-size.service";
import {ApplicationService} from "../../_services/application.service";
import {LanguageService} from "../../_services/language.service";

@Component({
  selector: 'app-family-estimate-main',
  templateUrl: './family-estimate-main.component.html',
  styleUrls: ['./family-estimate-main.component.scss']
})
export class FamilyEstimateMainComponent implements OnInit {

  famEst$: Observable<FamEst[]> = this.famEstSer.getAllUnlessAlreadyLoaded();
  family$: Observable<Family[]> = this.familySer.getAllUnlessAlreadyLoaded();
  famEsts: FamEst[] = [new FamEst()];
  families: Family[] = [new Family()];
  famEstSub: Subscription;

  constructor(
    private famEstSer: FamEstService,
    private familySer: FamilyService,
    // private famEstFormDataSer: FamEstFormService,
    private countrySer: CountryService,
    private applTypeSer: ApplTypeService,
    private entitySizeSer: EntitySizeService,
    private applSer: ApplicationService,
    private languageSer: LanguageService,
    private router: Router,
  ) {
    this.famEstSub = combineLatest([this.famEst$, this.family$ ]).subscribe(
      ([famEsts, families ]) => {
      this.families = families
      // this.famEstFormData = famEstFormData
      this.famEsts = map(famEsts, (x: FamEst) => {
        let d = families.find(y => y.id == x.id)
        return {
          ...x, 'family_name': d?.family_name,
          'family_no': d?.family_no
        }
      })
    })

    }

  ngOnInit(): void {
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

  seeDetails(famestformdata_id: number) {
    // find udn for id
    let family = this.families.find(x => x.famestformdata == famestformdata_id)
    if (family){
      let udn = family.fam_est_form_data_udn
      this.router.navigate(['/estimations/' + udn])
    }else{
      this.router.navigate(['/not-found'])
    }

  }
}
