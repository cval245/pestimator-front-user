import {Component, OnInit} from '@angular/core';
import {FamEst} from "../../estimation/_models/FamEst.model";
import {combineLatest, Observable, Subscription} from "rxjs";
import {forEach, map} from "lodash";
import {FamEstService} from "../../estimation/_services/fam-est.service";
import {FamilyService} from "../../portfolio/_services/family.service";
import {Family} from "../../portfolio/_models/family.model";
import {filter} from "rxjs/operators";
import {Router} from "@angular/router";
import {FamEstForm, FamEstFormSubmit} from "../../estimation/_models/FamEstForm.model";
import {FamEstFormService} from "../../estimation/_services/fam-est-form.service";
import {CountryService} from "../../characteristics/_services/country.service";
import {ApplTypeService} from "../../characteristics/_services/appl-type.service";
import {Country} from "../../characteristics/_models/Country.model";
import {ApplType} from "../../characteristics/_models/applType.model";
import {convertToFamEstForm} from "../../estimation/_models/FamEstForm.model";
import {EntitySize} from "../../characteristics/_models/entitySize.model";
import {Language} from "../../characteristics/_models/Language.model";
import {Application} from "../../application/_models/application.model";
import {EntitySizeService} from "../../characteristics/_services/entity-size.service";
import {ApplicationService} from "../../application/_services/application.service";
import {LanguageService} from "../../characteristics/_services/language.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  famEsts: FamEst[] = [new FamEst('')];
  // famEst$ = this.famEstSer.entities$;
  // family$ = this.familySer.entities$;
  // country$= this.countrySer.entities$;
  // applType$= this.applTypeSer.entities$;
  // famEstFormData$ = this.famEstFormDataSer.entities$;
  famEstSub: Subscription;
  families: Family[] = [new Family()];
  pageSize = 5;
  famEstFormData = [new FamEstFormSubmit()];
  countries: Country[] = [new Country]
  applTypes: ApplType[] = [new ApplType]
  famEst$: Observable<FamEst[]> = this.famEstSer.entities$.pipe(filter(x => x.length > 0));
  family$: Observable<Family[]> = this.familySer.entities$.pipe(filter(x => x.length > 0));
  famEstFormData$: Observable<FamEstFormSubmit[]> = this.famEstFormDataSer.entities$.pipe(filter(x => x.length > 0));
  country$: Observable<Country[]> = this.countrySer.entities$.pipe(filter(x => x.length > 0));
  applType$: Observable<ApplType[]> = this.applTypeSer.entities$.pipe(filter(x => x.length > 0));
  entitySize$: Observable<EntitySize[]> = this.entitySizeSer.entities$.pipe(filter(x => x.length > 0));
  language$: Observable<Language[]> = this.languageSer.entities$.pipe(filter(x => x.length > 0));
  application$: Observable<Application[]> = this.applSer.entities$.pipe(filter(x => x.length > 0));

  constructor(
    private famEstSer: FamEstService,
    private familySer: FamilyService,
    private famEstFormDataSer: FamEstFormService,
    private countrySer: CountryService,
    private applTypeSer: ApplTypeService,
    private router: Router,
    private entitySizeSer: EntitySizeService,
    private applSer: ApplicationService,
    private languageSer: LanguageService,
  ) {
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
      this.famEsts.sort((a, b) => {
        return Date.parse(b.date_created) - Date.parse(a.date_created)
      })
    })

    // this.famEstSub = combineLatest([combineLatest([this.famEst$, this.family$,
    //   this.famEstFormData$, this.country$, this.applType$, this.entitySize$]),
    //   combineLatest([this.language$, this.application$])])
    //   .subscribe(
    //     ([[famEsts, families,
    //         famEstFormData, countries,
    //         applTypes,entitySizes],
    //         [languages, appls]
    //       ]
    //     ) => {
    // // this.famEstSub = combineLatest([
    // //   this.famEst$.pipe(filter(x => x.length > 0)),
    // //   this.family$.pipe(filter(x => x.length > 0)),
    // //   this.famEstFormData$.pipe(filter(x => x.length > 0)),
    // //   this.country$.pipe(filter(x => x.length >0)),
    // //   this.applType$.pipe(filter(x => x.length > 0)),
    // // ])
    // //   .subscribe(
    // //     ([famEsts, families, famEstFormData]) => {
    //       this.families = families
    //       this.famEstFormData = map(famEstFormData, (x: FamEstFormSubmit) => {
    //         return convertToFamEstForm(x, countries, applTypes, entitySizes, languages, appls)
    //       })
    //       // this.famEstFormData = map(famEstFormData, x => convertToFamEstForm(x, this.countries, this.applTypes))
    //       this.famEsts = map(famEsts, (x: FamEst) => {
    //         let d = families.find(y => y.id == x.id)
    //         return {...x, 'family_name': d?.family_name, 'family_no': d?.family_no}
    //       })
    //       return this.famEsts.sort((a, b) => {
    //         return Date.parse(b.date_created) - Date.parse(a.date_created)
    //       })
    //     }
    //   )
  }

  ngOnInit() {
    this.famEstSer.getAll()
    this.familySer.getAll()
    this.famEstFormDataSer.getAll()
    // this.countrySer.getAll()
    // this.applTypeSer.getAll()
    // this.entitySizeSer.getAll();
    // this.languageSer.getAll();
    // this.applSer.getAll();
  }
  ngOnDestroy(){
    this.famEstSub.unsubscribe()
  }

  seeDetails(id: number) {
    // find udn for id
    let famEstFormData = this.famEstFormData.find(x => x.id == id)
    let udn = famEstFormData!.unique_display_no
    this.router.navigate(['/estimation/estimations/' + udn])
  }
}
