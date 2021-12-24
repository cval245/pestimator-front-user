import {Component, OnDestroy} from '@angular/core';
import {FamilyAllService} from "../../_services/family-all.service";
import {ActivatedRoute} from "@angular/router";
import {combineLatest, Subject, Subscription} from "rxjs";
import {FamilyAll} from "../../_models/FamilyAll.model";
import {switchMap} from "rxjs/operators";
import {FamEstFormService} from "../../_services/fam-est-form.service";
import {convertToFamEstForm, FamEstForm} from "../../_models/FamEstForm.model";
import {Country} from "../../_models/Country.model";
import {ApplType} from "../../_models/applType.model";
import {EntitySize} from "../../_models/entitySize.model";
import {Language} from "../../_models/Language.model";
import {Application} from "../../_models/application.model";
import {IDocFormat} from "../../_models/DocFormat.model";
import {FamilyService} from "../../_services/family.service";
import {CountryAllService} from "../../_services/country-all.service";
import {ApplicationService} from "../../_services/application.service";
import {ApplTypeAllService} from "../../_services/appl-type-all.service";
import {ApplDetailService} from "../../_services/appl-detail.service";
import {EntitySizeService} from "../../_services/entity-size.service";
import {DocFormatService} from "../../_services/doc-format.service";
import {LanguageService} from "../../_services/language.service";
import {FamEstDetTotService} from "../../_services/fam-est-det-tot.service";
import {FamEstDetTot} from "../../_models/FamEstDetTot.model";

@Component({
  selector: 'app-fam-est-details',
  templateUrl: './fam-est-details.component.html',
  styleUrls: ['./fam-est-details.component.scss']
})
export class FamEstDetailsComponent implements OnDestroy{

  private destroy = new Subject<void>()
  public familyAll: FamilyAll = new FamilyAll()
  private applTypes: ApplType[] = [new ApplType()];
  private docFormats: IDocFormat[] = new Array<IDocFormat>();
  private entitySizes: EntitySize[] = [new EntitySize()];
  private languages: Language[] = new Array<Language>();
  private countries: Country[] = [new Country()]
  private combinedSub: Subscription;
  public famEstDetTot: FamEstDetTot = new FamEstDetTot();
  public famform: FamEstForm = new FamEstForm()
  public applications: Application[] = [new Application()];
  constructor(
    private route: ActivatedRoute,
    private familyAllSer: FamilyAllService,
    private famEstFormSer: FamEstFormService,
    private familySer: FamilyService,
    private countrySer: CountryAllService,
    private applSer: ApplicationService,
    private applTypeSer: ApplTypeAllService,
    private applDetSer: ApplDetailService,
    private famformSer: FamEstFormService,
    private entitySizeSer: EntitySizeService,
    private docForSer: DocFormatService,
    private languageSer: LanguageService,
    private famEstDetTotSer: FamEstDetTotService,
  ) {
    let family_id = this.route.snapshot.params.id


    // let family$ = this.familyAllSer.getByKey(family_id).pipe(takeUntil(this.destroy)).pipe(switchMap(x =>{
    //   this.familyAll = x
    //   return this.famEstFormSer.getWithQuery('UDN'+x.fam_est_form_data_udn)
    // }))

    // let family$ = this.activatedRoute.params.pipe(
    //   switchMap(x => {
    //     return this.familySer.getWithQuery('FamEstFormDataUDN=' + x.udn)
    //   }))

    this.combinedSub = combineLatest([
      this.countrySer.getAllUnlessAlreadyLoaded(),
      this.familyAllSer.getByKey(family_id),
      this.applTypeSer.getAllUnlessAlreadyLoaded(),
      this.entitySizeSer.getAllUnlessAlreadyLoaded(),
      this.languageSer.getAllUnlessAlreadyLoaded(),
    ]).pipe(
      switchMap(([countries,
                   familyAll, applTypes, entitySizes, languages]) => {
        let appl$ = this.applSer.getWithQuery('familyUDN=' + familyAll.unique_display_no)
        let applDet$ = this.applDetSer.getWithQuery('familyUDN=' + familyAll.unique_display_no)
        let famform$ = this.famformSer.getWithQuery('UDN=' + familyAll.unique_display_no)
        let famDetTot$ = this.famEstDetTotSer.getWithQuery(('familyUDN=' + familyAll.unique_display_no))
        this.familyAll = familyAll
        this.applTypes = applTypes
        this.countries = countries
        this.entitySizes = entitySizes
        this.languages = languages
        return combineLatest([
          appl$,
          applDet$,
          famform$,
          famDetTot$,
          // this.docForSer.getAllUnlessAlreadyLoaded(),
        ])
      })).subscribe(([applications, applDetails, famform, famDetTot]) => {
      this.famEstDetTot = famDetTot[0]
      console.log('famform', famform)
      console.log('this.famform', this.famform)
      this.famform = convertToFamEstForm(famform[0], this.countries, this.applTypes, this.entitySizes, this.languages, this.applications, this.docFormats)
      this.famform.family_name = this.familyAll.family_name
      this.famform.family_no = this.familyAll.family_no
      this.applications = applications.map(appl => {
        let x = applDetails.find(det => det.application == appl.id)
        let y = this.countries.find(c => c.id == appl.country)
        let z = this.applTypes.find(a => a.id == appl.appl_type)
        return {
          ...appl, 'appl_details': x, 'country': y,
          'application_type': z
        }
      })
    })
  }

  ngOnDestroy(): void{
    this.destroy.next()
    this.destroy.complete()
    this.combinedSub.unsubscribe()
  }
}
