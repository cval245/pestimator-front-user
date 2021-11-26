import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {assign, defaults, each, groupBy, keyBy, keys, map, mapValues, reduce} from 'lodash';
import {FamEstDetail} from '../_models/FamEstDetail.model';
import {FamEstDetailService} from '../_services/fam-est-detail.service';
import {FamilyService} from 'src/app/portfolio/_services/family.service';
import {Family} from 'src/app/portfolio/_models/family.model';
import {ApplicationService} from 'src/app/application/_services/application.service';
import {ApplDetailService} from 'src/app/application/_services/appl-detail.service';
import {Application} from 'src/app/application/_models/application.model';
import {Country} from 'src/app/characteristics/_models/Country.model';
import {ApplType} from "../../characteristics/_models/applType.model";
import {FamEstFormService} from "../_services/fam-est-form.service";
import {convertToFamEstForm, FamEstForm} from "../_models/FamEstForm.model";
import {EntitySizeService} from "../../characteristics/_services/entity-size.service";
import {EntitySize} from "../../characteristics/_models/entitySize.model";
import {CountryAllService} from "../../characteristics/_services/country-all.service";
import {ApplTypeAllService} from "../../characteristics/_services/appl-type-all.service";
import {HttpClient} from "@angular/common/http";
import {GetXLSService} from "../_services/get-xls.service";
import {GetPDFService} from "../_services/get-pdf.service";
import {LanguageService} from "../../characteristics/_services/language.service";
import {Language} from "../../characteristics/_models/Language.model";

@Component({
  selector: 'app-fam-est-detail',
  templateUrl: './fam-est-detail.component.html',
  styleUrls: ['./fam-est-detail.component.scss']
})
export class FamEstDetailComponent implements OnInit, OnDestroy {

  public displayedColumns = [{
    columnDef: 'year',
    header: 'Year',
    cell: ''
  }]
  public countryAgged = [{}]
  public family: Family
  public applications: Application[] = [new Application()];
  public columns = [{
    columnDef: 'year',
    header: 'Year',
    cell: ''
  }]
  public famEstDetails: FamEstDetail[]
  private countries: Country[] = [new Country()]
  private combinedSub: Subscription;
  public famform: FamEstForm= new FamEstForm()
  public famEstFormData: FamEstForm[] = [new FamEstForm()];

  // private tableCombineSub: Subscription;
  private applTypes: ApplType[] = [new ApplType()];
  private entitySizes: EntitySize[] = [new EntitySize()];
  private languages: Language[] = new Array<Language>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private famEstDetSer: FamEstDetailService,
    private familySer: FamilyService,
    private countrySer: CountryAllService,
    private applSer: ApplicationService,
    private applTypeSer: ApplTypeAllService,
    private applDetSer: ApplDetailService,
    private famformSer: FamEstFormService,
    private entitySizeSer: EntitySizeService,
    private languageSer: LanguageService,
    private http: HttpClient,
    private getXlsSer: GetXLSService,
    private getPdfSer: GetPDFService,
  ) {
    this.famEstDetails = [new FamEstDetail()]
    this.family = new Family

    let famEstDetails$ = this.activatedRoute.params.pipe(
      switchMap(x => {
        return this.getFamEstDetailByFormUDN(x.udn)
      }))
    let family$ = this.activatedRoute.params.pipe(
      switchMap(x => {
        console.log('family$')
        return this.familySer.getWithQuery('FamEstFormDataUDN=' + x.udn)
      }))

    // this.applTypeSer.entities$.pipe(filter(x => x.length>0)),
    this.combinedSub = combineLatest([
      // this.countrySer.entities$.pipe(filter(x => x.length>0)),
      this.countrySer.getAllUnlessAlreadyLoaded(),
      famEstDetails$,
      family$,
      this.applTypeSer.getAllUnlessAlreadyLoaded(),
      this.entitySizeSer.getAllUnlessAlreadyLoaded(),
      this.languageSer.getAllUnlessAlreadyLoaded(),
      // this.entitySizeSer.entities$.pipe(filter(x=> x.length>0)),
      // this.languageSer.entities$.pipe(filter(x=>x.length>0))
    ]).pipe(
      switchMap(([countries, famEstDetails,
                  family, applTypes, entitySizes, languages]) => {
        this.famEstDetails = map(famEstDetails, x => {
          let country = countries.find(y => y.id == x.country)
          return {...x, 'country': country}
        })
        this.applTypes = applTypes
        this.countries = countries
        this.entitySizes = entitySizes
        this.languages = languages
        console.log('why so much')
        this.countryAgged = this.calcTotalMatrix()
        this.displayedColumns = this.calcColumns(this.countryAgged)
        this.family = family[0]
        let appl$ = this.applSer.getWithQuery('familyUDN=' + this.family.unique_display_no)
        let applDet$ = this.applDetSer.getWithQuery('familyUDN=' + this.family.unique_display_no)
        let famform$ = this.famformSer.getWithQuery('UDN=' + this.family.unique_display_no)
        return combineLatest([
          appl$,
          applDet$,
          famform$,
        ])
      })).subscribe(([applications, applDetails, famform]) => {
      this.applications = applications.map(appl => {
        console.log('inner')
        let x = applDetails.find(det => det.application == appl.id)
        let y = this.countries.find(c => c.id == appl.country)
        let z = this.applTypes.find(a => a.id == appl.appl_type)
        this.famform = convertToFamEstForm(famform[0], this.countries, this.applTypes, this.entitySizes, this.languages, this.applications)
        return {
          ...appl, 'appl_details': x, 'country': y,
          'application_type': z
        }
      })
    })
  }

  ngOnInit(): void {
    // this.countrySer.getAll()
    // this.applTypeSer.getAll()
    // this.entitySizeSer.getAll()
    // this.famformSer.getAll()
    // this.languageSer.getAll()
  }

  ngOnDestroy(): void {
    this.combinedSub.unsubscribe()
    // this.tableCombineSub.unsubscribe()
  }

  getFamEstDetailByFormUDN(udn: number): Observable<FamEstDetail[]> {
    return this.famEstDetSer.getWithQuery('FamEstFormDataUDN=' + udn)
  }

  add(famEstDetail: FamEstDetail) {
    this.famEstDetSer.add(famEstDetail);
  }

  delete(famEstDetail: FamEstDetail) {
    this.famEstDetSer.delete(famEstDetail)
  }

  getFamEsts() {
    this.famEstDetSer.getAll();
  }

  update(famEstDetail: FamEstDetail) {
    this.famEstDetSer.update(famEstDetail)
  }

  calcSynopsis(family: Family, famEstDetails: FamEstDetail[]) {
    // family_name | Family_no
    // country 1 | total cost
    // country 2 | total cost
    // total     | total cost overall
    let super_top_row = ['Family Name', 'Family Number']
    let top_row = [family.family_name, family.family_no]
    let header_row = ['Country', 'Cost']
    let synopsis = map(groupBy(famEstDetails, x => x.country.id), x => {

      let sum = reduce(x, (acc, value) => {
        if (value.total_cost_sum != undefined) {
          return acc + value.total_cost_sum
        } else {
          return acc + 0
        }
      }, 0)
      return [x[0].country.country, sum]
    })
    let bill = groupBy(famEstDetails, x => x.country.id)


    synopsis.unshift(header_row)
    synopsis.unshift(top_row)
    synopsis.unshift(super_top_row)
    //add total rows
    let total_row = reduce(famEstDetails, (acc, value) => {
      if (value.total_cost_sum != undefined) {
        return acc + value.total_cost_sum
      } else {
        return acc + 0
      }
    }, 0)
    synopsis.push(['total_row', total_row])
    return synopsis
  }

  calcOfficialCost(famEstDetails: any) {

    let bob = reduce(famEstDetails, function (obj: any, item: any) {
      if (item.official_cost_sum != undefined) {
        if (obj[item.year]) {
          obj[item.year] = item.official_cost_sum + obj[item.year]
        } else {
          obj[item.year] = item.official_cost_sum
        }
      } else {
        if (!obj[item.year]) {
          obj[item.year] = 0
        }
      }
      return obj
    }, {})

    let arr_keys = keys(bob)
    arr_keys.sort((a, b) => parseInt(a) - parseInt(b))
    // select keys not present
    let new_keys = []
    let key = parseInt(arr_keys[0])
    let last_key = parseInt(arr_keys[arr_keys.length - 1])
    while (key <= last_key) {
      // if key is not in
      if (!bob[key.toString()]) {
        new_keys.push(key.toString())
      }
      key++
    }
    // add keys in between
    for (let k of new_keys) {
      bob[k] = 0
    }
    bob['type'] = 'law_firm_costs'
    bob['type'] = 'total_official_costs'
    return bob
  }

  calcTranslationCost(famEstDetails: any) {

    let bob = reduce(famEstDetails, function (obj: any, item: any) {
      if (item.official_cost_sum != undefined) {
        if (obj[item.year]) {
          obj[item.year] = item.translation_cost_sum + obj[item.year]
        } else {
          obj[item.year] = item.translation_cost_sum
        }
      } else {
        if (!obj[item.year]) {
          obj[item.year] = 0
        }
      }
      return obj
    }, {})

    let arr_keys = keys(bob)
    arr_keys.sort((a, b) => parseInt(a) - parseInt(b))
    // select keys not present
    let new_keys = []
    let key = parseInt(arr_keys[0])
    let last_key = parseInt(arr_keys[arr_keys.length - 1])
    while (key <= last_key) {
      // if key is not in
      if (!bob[key.toString()]) {
        new_keys.push(key.toString())
      }
      key++
    }
    // add keys in between
    for (let k of new_keys) {
      bob[k] = 0
    }
    bob['type'] = 'translation_costs'
    return bob
  }


  calcColumns(countryAgged: any) {
    let columns = [
      {
        columnDef: 'country',
        header: 'Country',
        cell: 'country'
      },
    ]
    // find minimum year and maximum year
    let min_max_year = this.findMinMaxYear(countryAgged)
    let year = min_max_year['min_year']
    while (year <= min_max_year['max_year']) {
      let g = {
        columnDef: JSON.stringify(year),
        header: JSON.stringify(year),
        cell: JSON.stringify(year)
      }
      columns.push(g)
      year += 1
    }
    return columns
  }

  calcTotalMatrix() {
    let grouped_ests = groupBy(this.famEstDetails, 'country.id')
    let countryAgged = map(grouped_ests, x => {
      let sam = keyBy(x, function (o) {
        return JSON.stringify(o.year)
      })
      let years = mapValues(sam, function (o) {
        return reduce(x.filter(y => y.year == o.year),
          function (sum, r) {
            return sum + r.total_cost_sum!
          }, 0)
      })
      return assign({'country': x[0].country}, years)
    })
    let min_max_year = this.findMinMaxYear(countryAgged)
    //create list of year keys
    let year_keys = {}
    let year = min_max_year['min_year']
    while (year <= min_max_year['max_year']) {
      year_keys = assign(year_keys, {[year]: 0})
      year += 1
    }
    // for every key that does not exist in object insert into new
    each(countryAgged, (obj) => {
      defaults(obj, year_keys)
    })
    return countryAgged
  }


  // find minimum and maximum years
  findMinMaxYear(countryAgged: any) {
    let min_year = 0
    let max_year = 0
    each(countryAgged, (x) => {
      each(Object.keys(x), (y) => {
        if (y != 'country') {
          let y_parsed = parseInt(y)
          if (min_year == 0) {
            min_year = y_parsed
            max_year = y_parsed
          }
          if (y_parsed < min_year) {
            min_year = y_parsed
          } else if (y_parsed > max_year) {
            max_year = y_parsed
          }
        }
      })
    })
    return {'min_year': min_year, 'max_year': max_year}
  }


  retrieveXLSX() {
    this.getXlsSer.getAndDownload(this.family)
  }

  retrievePDF() {
    this.getPdfSer.getAndDownload(this.family)
  }
}
