import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {FamEst} from '../_models/FamEst.model';
import {FamEstService} from '../_services/fam-est.service';
import {FamilyService} from 'src/app/portfolio/_services/family.service';
import {Family} from 'src/app/portfolio/_models/family.model';
import {map} from 'lodash';
import {FamEstFormService} from "../_services/fam-est-form.service";
import {convertToFamEstForm, FamEstForm, FamEstFormSubmit} from "../_models/FamEstForm.model";
import {Router} from "@angular/router";
import {CountryService} from "../../characteristics/_services/country.service";
import {ApplTypeService} from "../../characteristics/_services/appl-type.service";
import {Country} from "../../characteristics/_models/Country.model";
import {ApplType} from "../../characteristics/_models/applType.model";
import {EntitySizeService} from "../../characteristics/_services/entity-size.service";
import {ApplicationService} from "../../application/_services/application.service";
import {LanguageService} from "../../characteristics/_services/language.service";
import {EntitySize} from "../../characteristics/_models/entitySize.model";
import {Language} from "../../characteristics/_models/Language.model";
import {Application} from "../../application/_models/application.model";

@Component({
  selector: 'app-family-estimate-main',
  templateUrl: './family-estimate-main.component.html',
  styleUrls: ['./family-estimate-main.component.scss']
})
export class FamilyEstimateMainComponent implements OnInit {

  loading$: Observable<boolean> = this.famEstSer.loading$;
  famEst$: Observable<FamEst[]> = this.famEstSer.entities$;
  family$: Observable<Family[]> = this.familySer.entities$;
  famEstFormData$: Observable<FamEstFormSubmit[]> = this.famEstFormDataSer.entities$;
  country$: Observable<Country[]> = this.countrySer.entities$;
  applType$: Observable<ApplType[]> = this.applTypeSer.entities$;
  entitySize$: Observable<EntitySize[]> = this.entitySizeSer.entities$;
  language$: Observable<Language[]> = this.languageSer.entities$;
  application$: Observable<Application[]> = this.applSer.entities$;
  famEsts: FamEst[] = [new FamEst('')];
  families: Family[] = [new Family()];
  famEstFormData: FamEstFormSubmit[] = [new FamEstFormSubmit()];
  famEstSub: Subscription;

  constructor(
    private famEstSer: FamEstService,
    private familySer: FamilyService,
    private famEstFormDataSer: FamEstFormService,
    private countrySer: CountryService,
    private applTypeSer: ApplTypeService,
    private entitySizeSer: EntitySizeService,
    private applSer: ApplicationService,
    private languageSer: LanguageService,
    private router: Router,
  ) {
    // let obs = {
    //   'famEsts': this.famEst$,
    //   'families': this.family$,
    //   'famEstFormData': this.famEstFormData$,
    //   'countries': this.country$,
    //   'applTypes': this.applType$,
    //   'entitySizes': this.entitySize$,
    //   'languages': this.language$,
    //   'applications': this.application$,
    // }

    //   this.famEstSub = combineLatest(obs)
    //     .subscribe()
    //
    this.famEstSub = combineLatest([this.famEst$, this.family$, this.famEstFormData$]).subscribe(([famEsts, families, famEstFormData])=>{
      this.families = families
      this.famEstFormData = famEstFormData
      this.famEsts = map(famEsts, (x: FamEst) => {
        let d = families.find(y => y.id == x.id)
        return {
          ...x, 'family_name': d?.family_name,
          'family_no': d?.family_no
        }
      })
    })

    // this.famEstSub = combineLatest([combineLatest([this.famEst$, this.family$,
    //   this.famEstFormData$, this.country$, this.applType$, this.entitySize$]),
    //   combineLatest([this.language$, this.application$])])
    //   .subscribe(
    //     ([[famEsts, families,
    //        famEstFormData, countries,
    //        applTypes,entitySizes],
    //        [languages, appls]
    //      ]//: [FamEst[], Family[], FamEstForm[], Country[], ApplType[], EntitySize[], Language[], Application[]]
    // ) => {
    //       this.families = families
    //       // this.famEstFormData = map(famEstFormData, (x: FamEstFormSubmit) => convertToFamEstForm(x, countries, applTypes, entitySizes, languages, appls))
    //       this.famEsts = map(famEsts, (x: FamEst) => {
    //         let d = families.find(y => y.id == x.id)
    //         return {
    //           ...x, 'family_name': d?.family_name,
    //           'family_no': d?.family_no
    //         }
    //       })
    //     }
    //     )
    }

  ngOnInit(): void {
    this.famEstSer.getAll();
    this.familySer.getAll();
    this.famEstFormDataSer.getAll();
    // this.countrySer.getAll();
    // this.applTypeSer.getAll();
    // this.entitySizeSer.getAll();
    // this.languageSer.getAll();
    // this.applSer.getAll();
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
