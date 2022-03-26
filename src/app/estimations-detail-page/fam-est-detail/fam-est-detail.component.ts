import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {
  assign,
  defaults,
  each,
  forEach,
  groupBy,
  keyBy,
  keys,
  map,
  mapValues,
  reduce,
  sortBy,
  sum,
  values
} from 'lodash';
import {FamEstDetail} from '../../_models/FamEstDetail.model';
import {FamEstDetailService} from '../../_services/fam-est-detail.service';
import {FamilyService} from 'src/app/_services/family.service';
import {Family} from 'src/app/_models/family.model';
import {ApplicationService} from 'src/app/_services/application.service';
import {ApplDetailService} from 'src/app/_services/appl-detail.service';
import {Application} from 'src/app/_models/application.model';
import {Country} from 'src/app/_models/Country.model';
import {ApplType} from "../../_models/applType.model";
import {FamEstFormService} from "../../_services/fam-est-form.service";
import {convertToFamEstForm, FamEstForm} from "../../_models/FamEstForm.model";
import {EntitySizeService} from "../../_services/entity-size.service";
import {EntitySize} from "../../_models/entitySize.model";
import {CountryAllService} from "../../_services/country-all.service";
import {ApplTypeAllService} from "../../_services/appl-type-all.service";
import {HttpClient} from "@angular/common/http";
import {GetXLSService} from "../../_services/get-xls.service";
import {GetPDFService} from "../../_services/get-pdf.service";
import {LanguageService} from "../../_services/language.service";
import {Language} from "../../_models/Language.model";
import {DocFormatService} from "../../_services/doc-format.service";
import {IDocFormat} from "../../_models/DocFormat.model";
import {FamEstDetTotService} from "../../_services/fam-est-det-tot.service";
import {FamEstDetTot} from "../../_models/FamEstDetTot.model";

export interface CountryAggedWise {
  country: Country;
  row_data: {
    [key: string]: number;
  }
}

export interface RowCountryAggedWise {
  row_name: string
  row_data: {
    [key: string]: number;
  }
}


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
  public countryAgged: CountryAggedWise[] = new Array<CountryAggedWise>()
  public rowCountryAgged: RowCountryAggedWise[] = new Array<RowCountryAggedWise>()
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
  public famform: FamEstForm = new FamEstForm()
  public famEstFormData: FamEstForm[] = [new FamEstForm()];

  // private tableCombineSub: Subscription;
  private applTypes: ApplType[] = [new ApplType()];
  private docFormats: IDocFormat[] = new Array<IDocFormat>();
  private entitySizes: EntitySize[] = [new EntitySize()];
  private languages: Language[] = new Array<Language>();
  public allCountryAgged: any;
  public cAgg: any;
  public cAggChart: any;
  public famEstDetTot: FamEstDetTot = new FamEstDetTot();

  constructor(
    private activatedRoute: ActivatedRoute,
    private famEstDetSer: FamEstDetailService,
    private famEstDetTotSer: FamEstDetTotService,
    private familySer: FamilyService,
    private countrySer: CountryAllService,
    private applSer: ApplicationService,
    private applTypeSer: ApplTypeAllService,
    private applDetSer: ApplDetailService,
    private famformSer: FamEstFormService,
    private entitySizeSer: EntitySizeService,
    private docForSer: DocFormatService,
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
        return this.familySer.getWithQueryByFamEstFormDataUDNUnlessLoaded(x.udn)
      }))

    this.combinedSub = combineLatest([
      this.countrySer.getAllUnlessAlreadyLoaded(),
      famEstDetails$,
      family$,
      this.applTypeSer.getAllUnlessAlreadyLoaded(),
      this.entitySizeSer.getAllUnlessAlreadyLoaded(),
      this.languageSer.getAllUnlessAlreadyLoaded(),
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
        this.countryAgged = this.calcTotalMatrix()
        this.allCountryAgged = this.calcAllCountryMatrix()
        this.rowCountryAgged = this.createRowCountryAgged(this.countryAgged)
        this.cAgg = this.calcTotcAggCol(this.allCountryAgged[0])
        this.cAggChart = this.allCountryAgged[0]
        this.displayedColumns = this.calcColumns(this.countryAgged)
        this.family = family[0]
        let appl$ = this.applSer.getWithQueryByFamEstFormDataUDNUnlessLoaded(this.family.unique_display_no)
        let applDet$ = this.applDetSer.getWithQueryByFamEstFormDataUDNUnlessLoaded(this.family.fam_est_form_data_udn)
        let famform$ = this.famformSer.getWithQueryByFamEstFormDataUDNUnlessLoaded(this.family.unique_display_no)
        let famDetTot$ = this.famEstDetTotSer.getWithQueryByFamEstFormDataUDNUnlessLoaded(this.family.unique_display_no)
        return combineLatest([
          appl$,
          applDet$,
          famform$,
          famDetTot$,
        ])
      })).subscribe(([applications, applDetails, famform, famDetTot]) => {
      this.famEstDetTot = famDetTot[0]
      this.famform = convertToFamEstForm(famform[0], this.countries, this.applTypes, this.entitySizes, this.languages, this.applications, this.docFormats)
      this.famform.family_name = this.family.family_name
      this.famform.family_no = this.family.family_no
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

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.combinedSub.unsubscribe()
  }

  getFamEstDetailByFormUDN(udn: number): Observable<FamEstDetail[]> {
    return this.famEstDetSer.getWithQueryByFamEstFormDataUDNUnlessLoaded(udn)
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


  calcColumns(countryAgged: CountryAggedWise[]) {
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

  calcAllCountryMatrix() {
    let groupedCountryDets = groupBy(this.famEstDetails, 'country.id')
    let groupedCountryAgged: any = []
    forEach(groupedCountryDets, x => {
      groupedCountryAgged.push(this.calcCountryMatrix(x))
    })
    return sortBy(groupedCountryAgged, 'country.long_name')
  }

  calcCountryMatrix(countryDets: FamEstDetail[]) {
    let min_max = this.findMinMaxYearFromDets(this.famEstDetails)
    // countryDets = cloneDeep(countryDets)
    let years: any = {}
    for (let year = min_max['min_year']; year <= min_max['max_year']; year++) {
      years[year] = 0
    }
    let totAgged: any = {}
    forEach(countryDets, x => {
      if (x) {
        totAgged[JSON.stringify(x.year)] = x.total_cost_sum
      }
    })
    defaults(totAgged, years)

    let transAgged: any = {}
    forEach(countryDets, x => {
      if (x) {
        transAgged[JSON.stringify(x.year)] = x.translation_cost_sum
      }
    })
    defaults(transAgged, years)

    let officialAgged: any = {}
    forEach(countryDets, x => {
      if (x) {
        officialAgged[JSON.stringify(x.year)] = x.official_cost_sum
      }
    })
    defaults(officialAgged, years)
    let countryAgged = {
      tot_agged: {'country': countryDets[0].country, row_data: totAgged},
      trans_agged: {'country': countryDets[0].country, row_data: transAgged},
      official_agged: {'country': countryDets[0].country, row_data: officialAgged},
    }

    return {'country': countryDets[0].country, ...countryAgged}
  }

  calcTotalMatrix(): CountryAggedWise[] {
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
      return assign({'country': x[0].country}, {row_data: years})
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
      defaults(obj.row_data, year_keys)
    })
    return sortBy(countryAgged, x => x.country.long_name)
  }

  createRowCountryAgged(countryAgged: CountryAggedWise[]): RowCountryAggedWise[] {
    let totColCountryAgged = this.addTotColumn(countryAgged)
    let rowCountryAgged = this.calcRowCountryAgged(totColCountryAgged)
    return this.calcTotRowCountryAgged(rowCountryAgged)
  }

  addTotColumn(countryAgged: CountryAggedWise[]): CountryAggedWise[] {
    return map(countryAgged, x => {
      let totColVal = reduce(x.row_data, (result, value) => {
        result = value + result
        return result
      }, 0)
      return {country: x.country, row_data: {...x.row_data, 'total': totColVal}}
    })
  }

  calcRowCountryAgged(countryAgged: CountryAggedWise[]): RowCountryAggedWise[] {
    return map(countryAgged, x => {
      return {row_name: x.country.long_name, row_data: x.row_data}
    })
  }

  calcTotRowCountryAgged(rowCountryAgged: RowCountryAggedWise[]): RowCountryAggedWise[] {
    let totRowCountryAgged = {'row_name': 'Total', 'row_data': {}} as RowCountryAggedWise
    totRowCountryAgged = reduce(rowCountryAgged, (result, value) => {
      forEach(value.row_data, (yValue, key) => {
        if (result.row_data[key]) {
          result.row_data[key] += yValue
        } else {
          result.row_data[key] = yValue
        }
      })
      value.row_data
      return result
    }, totRowCountryAgged)
    rowCountryAgged.push(totRowCountryAgged)
    return rowCountryAgged
  }

  findMinMaxYearFromDets(famEstDetails: FamEstDetail[]) {
    let min_year = reduce(famEstDetails, (min_year, x) => {
      if (x.year < min_year) {
        return x.year
      } else {
        return min_year
      }
    }, famEstDetails[0].year)
    let max_year = reduce(famEstDetails, (max_year, x) => {
      if (x.year > max_year) {
        return x.year
      } else {
        return max_year
      }
    }, famEstDetails[0].year)
    return {'min_year': min_year, 'max_year': max_year}
  }

  // find minimum and maximum years
  findMinMaxYear(countryAgged: CountryAggedWise[]) {
    let min_year = 0
    let max_year = 0
    each(countryAgged, (x) => {
      each(Object.keys(x.row_data), (y) => {
        // if (y != 'country') {
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
        // }
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

  getCountryAgged(i: number) {
    return this.allCountryAgged[i];
  }

  openCountryAgged(cAgg: any) {
    this.cAgg = this.calcTotcAggCol(cAgg)
    this.cAggChart = cAgg
  }

  calcTotcAggCol(cAgg: any) {
    let new_trans = {...cAgg.trans_agged.row_data, 'total': sum(values(cAgg.trans_agged.row_data))}
    let official_trans = {...cAgg.official_agged.row_data, 'total': sum(values(cAgg.official_agged.row_data))}
    let tot_trans = {...cAgg.tot_agged.row_data, 'total': sum(values(cAgg.tot_agged.row_data))}

    return {
      country: cAgg.country,
      trans_agged: {country: cAgg.country, row_data: new_trans},
      official_agged: {country: cAgg.country, row_data: official_trans},
      tot_agged: {country: cAgg.country, row_data: tot_trans},
    }
  }
}
