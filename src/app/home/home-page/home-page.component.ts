import {Component, OnDestroy} from '@angular/core';
import {FamEst} from "../../_models/FamEst.model";
import {combineLatest, Observable, Subject} from "rxjs";
import {map} from "lodash";
import {FamEstService} from "../../_services/fam-est.service";
import {FamilyService} from "../../_services/family.service";
import {Family} from "../../_models/family.model";
import {filter, takeUntil} from "rxjs/operators";
import {Router} from "@angular/router";
import {CountryService} from "../../_services/country.service";
import {ApplTypeService} from "../../_services/appl-type.service";
import {Country} from "../../_models/Country.model";
import {ApplType} from "../../_models/applType.model";
import {ArticleService} from "../../_services/article.service";
import {Article} from "../../_models/article.model";
import {LawFirmService} from "../../_services/law-firm.service";
import {LawFirm} from "../../_models/law-firm.model";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnDestroy {

  famEsts: FamEst[] = new Array<FamEst>();
  private lawFirms = new Array<LawFirm>()
  public featured_lawfirm = new LawFirm()
  public latest_article: Article = new Article()
  private destroy = new Subject<void>()
  families: Family[] = new Array<Family>();
  pageSize = 5;
  countries: Country[] = new Array<Country>()
  applTypes: ApplType[] = new Array<ApplType>()
  private famEst$: Observable<FamEst[]> = this.famEstSer.getAllUnlessAlreadyLoaded().pipe(filter(x => x.length > 0));
  private family$: Observable<Family[]> = this.familySer.getAllUnlessAlreadyLoaded().pipe(filter(x => x.length > 0));


  constructor(
    private famEstSer: FamEstService,
    private familySer: FamilyService,
    private countrySer: CountryService,
    private applTypeSer: ApplTypeService,
    private router: Router,
    private articleSer: ArticleService,
    private lawFirmSer: LawFirmService,
  ) {
    this.articleSer.getAllUnlessAlreadyLoaded()
      .pipe(takeUntil(this.destroy)).subscribe(x => {
      this.latest_article = x[0]
    })
    this.lawFirmSer.getAllUnlessAlreadyLoaded()
      .pipe(takeUntil(this.destroy)).subscribe(x => {
      this.lawFirms = x
      this.featured_lawfirm = x[0]
    })
    combineLatest([this.famEst$, this.family$])
      .pipe(takeUntil(this.destroy))
      .subscribe(([famEsts, families]) => {
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

  ngOnDestroy() {
    this.destroy.next()
    this.destroy.complete()
  }

  seeDetails(famestformdata_id: number) {
    // find udn for id
    let family = this.families.find(x => x.famestformdata == famestformdata_id)
    if (family) {
      let udn = family.fam_est_form_data_udn
      this.router.navigate(['/estimations/' + udn])
    } else {
      this.router.navigate(['/not-found'])
    }
  }
}
