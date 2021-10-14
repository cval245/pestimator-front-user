import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {filter, mergeMap, switchMap} from 'rxjs/operators';
import {assign, defaults, each, groupBy, keyBy, keys, map, mapValues, reduce, values} from 'lodash';
import {FamEstDetail} from '../_models/FamEstDetail.model';
import {FamEstDetailService} from '../_services/fam-est-detail.service';
// @ts-ignore
import * as XLSX from 'xlsx/dist/xlsx.core.min';
import {FamilyService} from 'src/app/portfolio/_services/family.service';
import {Family} from 'src/app/portfolio/_models/family.model';
import {ApplicationService} from 'src/app/application/_services/application.service';
import {ApplDetailService} from 'src/app/application/_services/appl-detail.service';
import {Application} from 'src/app/application/_models/application.model';
import {Country} from 'src/app/characteristics/_models/Country.model';
import {ApplType} from "../../characteristics/_models/applType.model";
import {FamEstFormService} from "../_services/fam-est-form.service";
import {FamEstFormFull} from "../_models/FamEstForm.model";
import {EntitySizeService} from "../../characteristics/_services/entity-size.service";
import {EntitySize} from "../../characteristics/_models/entitySize.model";
import {CountryAllService} from "../../characteristics/_services/country-all.service";
import {ApplTypeAllService} from "../../characteristics/_services/appl-type-all.service";

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
  private countries: Country[] = [new Country(0, '', '', false, false, false, '', '', [0], [0], [0])]
  private combinedSub: Subscription;
  public famform: FamEstFormFull = new FamEstFormFull(
    '',
    '',
    new EntitySize(0, '', ''),
    new Date(),
    new Country(0, '', '', false, false, false, '', '', [0], [0], [0]),
    new ApplType(0, '', '', [0]),
    0,
    0,
    0,
    0,
    0,
    0,
    false,
    new Country(0, '', '', false, false, false, '', '', [0], [0], [0]),
    new Country(0, '', '', false, false, false, '', '', [0], [0], [0]),
    [],
    false,
    0,
    0,
    0,
    0,
  )
  private tableCombineSub: Subscription;
  private applTypes: ApplType[] = [new ApplType(0, '', '', [0])];

  constructor(
    private activatedRoute: ActivatedRoute,
    private famEstDetSer: FamEstDetailService,
    private familySer: FamilyService,
    private countrySer: CountryAllService,
    private applSer: ApplicationService,
    private applTypeSer: ApplTypeAllService,
    private applDetSer: ApplDetailService,
    private famformSer: FamEstFormService,
    private entitySizeSer: EntitySizeService
  ) {
    this.famEstDetails = [new FamEstDetail()]
    this.family = new Family
    this.tableCombineSub = combineLatest([
      this.activatedRoute.params,
      // this.activatedRoute.data,
      this.famformSer.entities$.pipe(filter(z => z.length > 0)),
      this.countrySer.entities$.pipe(filter(z => z.length > 0)),
      this.applTypeSer.entities$.pipe(filter(z => z.length > 0)),
      this.entitySizeSer.entities$.pipe(filter(z => z.length > 0))])
      .subscribe(x => {
        let famforms = x[1]
        let famform = famforms.find(y => y.unique_display_no == x[0].udn)!
        let countries = x[2]
        let applTypes = x[3]
        let entitySizes = x[4]
        this.famform.init_appl_country = countries.find(y => y.id == famform.init_appl_country)!
        this.famform.pct_country = countries.find(y => y.id == famform.pct_country)!
        this.famform.init_appl_type = applTypes.find(y => y.id == famform.init_appl_type)!
        this.famform.pct_countries = map(famform.pct_countries, z => countries.find(y => y.id == z))
        this.famform.entity_size = entitySizes.find(y => y.id == famform.entity_size)!
        this.famform.id = famform.id
        this.famform.family_name = famform.family_name
        this.famform.family_no = famform.family_no
        this.famform.init_appl_filing_date = famform.init_appl_filing_date
        this.famform.init_appl_claims = famform.init_appl_claims
        this.famform.init_appl_indep_claims = famform.init_appl_indep_claims
        this.famform.init_appl_pages_desc = famform.init_appl_pages_desc
        this.famform.init_appl_pages_claims = famform.init_appl_pages_claims
        this.famform.init_appl_pages_drawings = famform.init_appl_pages_drawings
        this.famform.init_appl_drawings = famform.init_appl_drawings
        this.famform.pct_method = famform.pct_method
        this.famform.ep_method = famform.ep_method
        this.famform.ep_countries = map(famform.ep_countries, z => countries.find(y => y.id == z))
        this.famform.paris_countries = map(famform.paris_countries, z => countries.find(y => y.id == z))
      })


    let famEstDetails$ = this.activatedRoute.params.pipe(
      switchMap(x => {
        return this.getFamEstDetailByFormUDN(x.udn)
      }))
    let family$ = this.activatedRoute.params.pipe(
      switchMap(x => {
        return this.familySer.getWithQuery('FamEstFormDataUDN=' + x.udn)
      }))
    this.combinedSub = combineLatest(this.countrySer.getAll(), famEstDetails$,
      family$, this.applTypeSer.entities$).pipe(
      mergeMap(([countries, famEstDetails,
                  family, applTypes]) => {
        this.famEstDetails = map(famEstDetails, x => {
          let country = countries.find(y => y.id == x.country)
          return {...x, 'country': country}
        })
        this.applTypes = applTypes
        this.countries = countries
        this.countryAgged = this.calcTotalMatrix()
        this.displayedColumns = this.calcColumns(this.countryAgged)
        this.family = family[0]
        let appl$ = this.applSer.getWithQuery('familyUDN=' + family[0].unique_display_no)
        let applDet$ = this.applDetSer.getWithQuery('familyUDN=' + family[0].unique_display_no)
        return combineLatest(appl$, applDet$)
      })).subscribe(([applications, applDetails]) => {
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
      this.countrySer.getAll()
      this.applTypeSer.getAll()
      this.entitySizeSer.getAll()
      this.famformSer.getAll()
    }

  ngOnDestroy(): void {
    this.combinedSub.unsubscribe()
    this.tableCombineSub.unsubscribe()
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

    getFamEsts(){
        this.famEstDetSer.getAll();
    }

    update(famEstDetail: FamEstDetail){
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

    exportXLSX() {

      const wb: XLSX.WorkBook = XLSX.utils.book_new()

      let synopsis = this.calcSynopsis(this.family, this.famEstDetails)
      let ws_synopsis: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(synopsis)
      XLSX.utils.book_append_sheet(wb, ws_synopsis, 'Synopsis')

      let keys = this.convert_collection_json_to_aoa(this.countryAgged)
      let countryAggedNorm = keys
      for (let c of this.countryAgged) {
        let acc: string[] = values(c)
        let country: string = acc.pop()!
        acc.unshift(country)
        countryAggedNorm.push(acc)
      }
      let ws_two: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(countryAggedNorm)
      XLSX.utils.book_append_sheet(wb, ws_two, 'Total Costs')

      // rearrange so first row is titles
      // **********************************
      // Law Firm Estimates Below
      // **********************************
      let law_temp = this.calcLawFirmTot(this.famEstDetails)
      let law = this.json_to_aoa(law_temp)
      let law_keys = this.json_to_aoa_keys(law_temp)
      // **********************************
      // Law Firm Estimates above
      // **********************************
      let off = values(this.calcOfficialCost(this.famEstDetails))
      off.unshift(off.pop())
      let translation = values(this.calcTranslationCost(this.famEstDetails))
      translation.unshift(translation.pop())
      //let arr_obj = [law_keys, law, off, translation]
      let arr_obj = [law_keys, off, translation]
      let ws_three: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(arr_obj)
      XLSX.utils.book_append_sheet(wb, ws_three, 'Type of Cost')

      let arr_famform = this.convertFamformArr(this.famform)
      let ws_four: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(arr_famform)
      XLSX.utils.book_append_sheet(wb, ws_four, 'Parameters')


      XLSX.writeFile(wb, 'out.xlsb')
    }

  convertFamformArr(famform: FamEstFormFull) {
    let arr = []
    arr.push(['Family Name', famform.family_name])
    arr.push(['Family Ref. No.', famform.family_no])
    arr.push(['Entity Size', famform.entity_size.entity_size])
    arr.push(['Initial Filing Date', famform.init_appl_filing_date])
    arr.push(['Number of Claims', famform.init_appl_claims])
    arr.push(['Number of Indep Claims', famform.init_appl_indep_claims])
    arr.push(['Number of Drawings', famform.init_appl_drawings])
    arr.push(['Number of Pages for Specification', famform.init_appl_pages_desc])
    arr.push(['Number of Pages for Claims', famform.init_appl_pages_claims])
    arr.push(['Number of Pages for Drawings', famform.init_appl_pages_drawings])
    arr.push(['Using PCT Method', famform.pct_method])
    if (famform.pct_country) {
      arr.push(['PCT Country', famform.pct_country.long_name])
    }
    arr.push(['Using EP Method', famform.ep_method])
    arr.push(['National Phase Countries', ''])
    arr.unshift(['Parameters'])
    arr.unshift(['', ''])
    let i = 1;
    for (let c of famform.pct_countries) {
      arr.push([i.toString() + '.', c.long_name])
      i++
    }
    arr.forEach(x => x.unshift(''))

    return arr
  }

  calcLawFirmTot(famEstDetails: FamEstDetail[]) {

    let bob = reduce(famEstDetails, function (obj: any, item: any) {
      if (item.law_firm_cost_sum != undefined) {
        if (obj[item.year]) {
          obj[item.year] = item.law_firm_cost_sum + obj[item.year]
        } else {
          obj[item.year] = item.law_firm_cost_sum
        }
      } else {
        if (!obj[item.year]) {
          obj[item.year] = 0
        }
      }
      return obj
    }, {})
    // find min max year by parsing keys
    // keys()
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
    return bob
  }
    calcOfficialCost(famEstDetails: any){

        let bob=reduce(famEstDetails, function (obj: any, item: any){
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
        while(year<=min_max_year['max_year']) {
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



    calcCountryTotalMatrix(){
        let grouped_ests = groupBy(this.famEstDetails, 'country.id')
        let countryTotAgged = map(grouped_ests, x =>{
            let sam = keyBy(x, function(o){
                return JSON.stringify(o.year)
            })
            let years = mapValues(sam, function(o){
                return {'total_cost': o.total_cost_sum,
                        'law_firm': o.law_firm_cost_sum,
                        'official_cost': o.official_cost_sum}
            })
            return assign({'country' : x[0].country}, years)
        })
        let min_max_year = this.findMinMaxYear(countryTotAgged)
        //create list of year keys
        let year_keys ={}
        let year = min_max_year['min_year']
        while (year <= min_max_year['max_year']){
            year_keys = assign(year_keys, {[year]:0})
            year += 1
        }
        // for every key that does not exist in object insert into new
        each(countryTotAgged, (obj) => {
            defaults(obj, year_keys)
        })
        return countryTotAgged
    }



    // find minimum and maximum years
    findMinMaxYear(countryAgged: any){
        let min_year=0
        let max_year=0
        each(countryAgged, (x) => {
            each(Object.keys(x), (y) => {
                if (y != 'country') {
                    let y_parsed = parseInt(y)
                    if(min_year == 0){
                        min_year = y_parsed
                        max_year = y_parsed
                    }
                    if (y_parsed < min_year){
                        min_year = y_parsed
                    } else if (y_parsed > max_year){
                        max_year = y_parsed
                    }
                }
            })
        })
        return {'min_year': min_year, 'max_year': max_year}
    }

    calcTotal() {
      // aggregate data together
      return values(this.famEstDetails.reduce(function (obj: any, item) {
        var index = item.year
        obj[index] = {
          year: index,
          cost: (obj[index] && obj[index].total_cost_sum || 0) + item.total_cost_sum
        }
        return obj
      }, {}))
    }
    convert_collection_json_to_aoa(collection:any) {
      let keys = this.json_to_aoa_keys(collection[0])
      let accumulator = [keys]
      for (let row of collection) {
        row.country = row.country.country
      }
      return accumulator
    }
    convert_collection_nested_json_to_aoa(collection:any){
        let keys = this.json_to_aoa_keys(collection[0])
        let accumulator=[keys]
        for (let item of collection){
            item.country = item.country.country
        }
        return accumulator
    }

    json_to_aoa(obj: any){
        //place last first
        let arr = values(obj)
        arr.unshift(arr.pop())
        return arr
    }
    json_to_aoa_keys(obj: any){
        //place last first
        let arr = keys(obj)
        arr.unshift(arr.pop()!)
        return arr
    }

}
