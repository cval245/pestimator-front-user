import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {mergeMap, switchMap} from 'rxjs/operators';
import {assign, defaults, each, groupBy, keyBy, keys, map, mapValues, reduce, values} from 'lodash';
import {FamEstDetail} from '../_models/FamEstDetail.model';
import {FamEstDetailService} from '../_services/fam-est-detail.service';
// @ts-ignore
import * as XLSX from 'xlsx/dist/xlsx.core.min';
import {FamilyService} from 'src/app/portfolio/_services/family.service';
import {Family} from 'src/app/portfolio/_models/family.model';
import {CountryService} from 'src/app/characteristics/_services/country.service';
import {ApplicationService} from 'src/app/application/_services/application.service';
import {ApplDetailService} from 'src/app/application/_services/appl-detail.service';
import {Application} from 'src/app/application/_models/application.model';
import {Country} from 'src/app/characteristics/_models/Country.model';
import {ApplTypeService} from "../../characteristics/_services/appl-type.service";
import {ApplType} from "../../characteristics/_models/applType.model";

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
  private countries: Country[] = [new Country(0, '', '', false, false, '', '')]
  private combinedSub: Subscription;
  //private familySub: Subscription;
  private applTypes: ApplType[] = [new ApplType(0, '', '')];

  constructor(
    private activatedRoute: ActivatedRoute,
    private famEstDetSer: FamEstDetailService,
    private familySer: FamilyService,
    private countrySer: CountryService,
    private applSer: ApplicationService,
    private applTypeSer: ApplTypeService,
    private applDetSer: ApplDetailService,
  ) {
    this.famEstDetails = [new FamEstDetail()]
    this.family = new Family

    let famEstDetails$ = this.activatedRoute.params.pipe(
      switchMap(x => {
        return this.getFamEstDetailByFormId(x.id)
      }))
    let family$ = this.activatedRoute.params.pipe(
      switchMap(x => {
        return this.familySer.getWithQuery('FamEstFormData=' + x.id)
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
        let appl$ = this.applSer.getWithQuery('family=' + family[0].id)
        let applDet$ = this.applDetSer.getWithQuery('family=' + family[0].id)
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
    }

    ngOnDestroy(): void{
        this.combinedSub.unsubscribe()
    }

    getFamEstDetailByFormId(id: number): Observable<FamEstDetail[]>{
        return this.famEstDetSer.getWithQuery('FamEstFormData='+id)
    }

    add(famEstDetail: FamEstDetail){
        this.famEstDetSer.add(famEstDetail);
    }

    delete(famEstDetail: FamEstDetail){
        this.famEstDetSer.delete(famEstDetail)
    }

    getFamEsts(){
        this.famEstDetSer.getAll();
    }

    update(famEstDetail: FamEstDetail){
        this.famEstDetSer.update(famEstDetail)
    }

    calcSynopsis(family: Family, famEstDetails: FamEstDetail[]){
        // family_name | Family_no
        // country 1 | total cost
        // country 2 | total cost
        // total     | total cost overall
        let super_top_row = ['Family Name', 'Family Number']
        let top_row = [family.family_name, family.family_no]
        let header_row = ['Country', 'Cost']
        let synopsis = map(groupBy(famEstDetails, 'country'), x => {
            let sum = reduce(x, (acc, value)=>{
                if (value.total_cost_sum != undefined){
                    return acc + value.total_cost_sum
                } else{
                    return acc+0
                }
            }, 0)
            return [x[0].country.country, sum]
        })
        synopsis.unshift(header_row)
        synopsis.unshift(top_row)
        synopsis.unshift(super_top_row)
        //add total rows
        let total_row = reduce(famEstDetails, (acc, value)=>{
            if (value.total_cost_sum != undefined){
                return acc + value.total_cost_sum
            } else{
                return acc+0
            }
        }, 0)
        synopsis.push(['total_row', total_row])
        return synopsis
    }

    exportXLSX(){

        const wb: XLSX.WorkBook = XLSX.utils.book_new()

        //let bb =map(omit(this.famEstDetails,'id'))
        let synopsis = this.calcSynopsis(this.family, this.famEstDetails)
        let ws_synopsis: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(synopsis)
        XLSX.utils.book_append_sheet(wb, ws_synopsis, 'Synopsis')

        let countryAggedNorm = this.convert_collection_json_to_aoa(this.countryAgged)
        let ws_two: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(countryAggedNorm)
        XLSX.utils.book_append_sheet(wb, ws_two, 'Total Costs')

        // rearrange so first row is titles
        let law_temp = this.calcLawFirmTot(this.famEstDetails)
        let law = this.json_to_aoa(law_temp)
        let law_keys = this.json_to_aoa_keys(law_temp)
        let off = values(this.calcOfficialCost(this.famEstDetails))
        off.unshift(off.pop())
        let arr_obj = [law_keys, law, off]
        let ws_three: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(arr_obj)
        XLSX.utils.book_append_sheet(wb, ws_three, 'Type of Cost')

        let sheetCountries = this.calcCountryTotalMatrix()
        this.convert_collection_nested_json_to_aoa(sheetCountries)


        XLSX.writeFile(wb, 'out.xlsb')
    }

    calcLawFirmTot(famEstDetails: any){

        let bob=reduce(famEstDetails, function (obj: any, item: any){
            if (item.law_firm_cost_sum != undefined){
                obj[item.year] = item.law_firm_cost_sum
            } else{
                obj[item.year] = 0
            }
            return obj
        },{})
        bob['type']='total_law_firm_costs'
        return bob
    }
    calcOfficialCost(famEstDetails: any){

        let bob=reduce(famEstDetails, function (obj: any, item: any){
            if (item.official_cost_sum != undefined){
                obj[item.year] = item.official_cost_sum
            } else{
                obj[item.year] = 0
            }
            return obj
        },{})
        bob['type']='total_official_costs'
        return bob
    }

    calcColumns(countryAgged: any){
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
    convert_collection_json_to_aoa(collection:any){
        let keys = this.json_to_aoa_keys(collection[0])
        let accumulator=[keys]
        for (let item of collection){
            item.country = item.country.country
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
