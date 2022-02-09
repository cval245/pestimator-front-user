import {Component, OnInit} from '@angular/core';
import {DetailedFeeCategoryService} from "../_services/detailed-fee-category.service";
import {CountryAllService} from "../../_services/country-all.service";
import {combineLatest, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {IDetailedFeeCategory} from "../_models/DetailedFeeCategory.model";
import {Country} from "../../_models/Country.model";
import {ApplType} from "../../_models/applType.model";
import {ApplTypeService} from "../../_services/appl-type.service";

@Component({
  selector: 'app-detailed-fee-category-form-page',
  templateUrl: './detailed-fee-category-form-page.component.html',
  styleUrls: ['./detailed-fee-category-form-page.component.scss']
})
export class DetailedFeeCategoryFormPageComponent implements OnInit {

  private destroyed = new Subject<void>()
  public detailedFeeCategories: IDetailedFeeCategory[] = new Array<IDetailedFeeCategory>();
  public countries: Country[] = new Array<Country>();
  public applTypes: ApplType[] = new Array<ApplType>();
  public columnDefs: any

  constructor(
    private countrySer: CountryAllService,
    private applTypeSer: ApplTypeService,
    private detailedFeeCatSer: DetailedFeeCategoryService) {
  }


  ngOnInit(): void {
    combineLatest([
      this.countrySer.getAllUnlessAlreadyLoaded(),
      this.applTypeSer.getAllUnlessAlreadyLoaded(),
      this.detailedFeeCatSer.getAllUnlessAlreadyLoaded()
    ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(([countries, applTypes, detailedFeeCats]) => {
        this.applTypes = applTypes
        this.countries = countries.sort((a, b) => {
          let countryA = a.long_name.toUpperCase()
          let countryB = b.long_name.toUpperCase()
          if (countryA < countryB) {
            return -1;
          }
          if (countryA > countryB) {
            return 1;
          }
          return 0;
        })
        this.detailedFeeCategories = detailedFeeCats.map(y => {
          let country = countries.find(z => z.id == y.country)!
          y = {...y, country: country}
          return y
        })
      })
  }

  ngOnDestroy(): void {
    this.destroyed.next()
    this.destroyed.complete()
  }


  onSubmitDetailedFeeCat(formData: IDetailedFeeCategory) {
    formData.country = formData.country.id
    if (formData.id == 0 || undefined) {
      this.detailedFeeCatSer.add(formData).subscribe()
    } else {
      this.detailedFeeCatSer.update(formData).subscribe()
    }
  }

  delDetailedFeeCat(delRows: IDetailedFeeCategory[]): void {
    for (let row of delRows) {
      this.detailedFeeCatSer.delete(row.id).subscribe()
    }
  }
}
