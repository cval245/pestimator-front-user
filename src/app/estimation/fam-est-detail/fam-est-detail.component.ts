import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';
import { values, keys, groupBy, keyBy, mapValues, each, map, assign, omit, transform, reduce, reject,
         defaults, flatMap } from 'lodash';
import { FamEstDetail } from '../_models/FamEstDetail.model';
import { FamEstDetailService } from '../_services/fam-est-detail.service';
// @ts-ignore
import * as XLSX from 'xlsx/dist/xlsx.core.min';
import { FamEstService } from '../_services/fam-est.service';
import { FamilyService } from 'src/app/portfolio/_services/family.service';
import { Family } from 'src/app/portfolio/_models/family.model';
import { CountryService } from 'src/app/characteristics/_services/country.service';
import { ApplicationService } from 'src/app/application/_services/application.service';
import { ApplDetailService } from 'src/app/application/_services/appl-detail.service';
import { Application } from 'src/app/application/_models/application.model';
import { Country } from 'src/app/characteristics/_models/Country.model';

@Component({
  selector: 'app-fam-est-detail',
  templateUrl: './fam-est-detail.component.html',
  styleUrls: ['./fam-est-detail.component.scss']
})
export class FamEstDetailComponent implements OnInit {

    displayedColumns: string[]=['']
    public countryAgged = [{}]
    public family: Family
    public applications: Application[] = [new Application()];
    public columns=[{
        columnDef: 'year',
        header: 'Year',
        cell: ''
    }]
    public famEstDetails: FamEstDetail[]
    private countries: Country[] = [new Country(0,'','')]
    private combinedSub: Subscription;
    //private familySub: Subscription;
    constructor(
        private activatedRoute: ActivatedRoute,
        private famEstDetSer: FamEstDetailService,
        private familySer: FamilyService,
        private countrySer: CountryService,
        private applSer: ApplicationService,
        private applDetSer: ApplDetailService,
    ) {
        this.famEstDetails = [new FamEstDetail()]
        this.family = new Family

        let famEstDetails$ = this.activatedRoute.params.pipe(
            switchMap(x => {
                //this.familySer.getWithQuery('FamEstFormData='+x.id).subscribe(console.log)
                return this.getFamEstDetailByFormId(x.id)
            }))
        let family$ = this.activatedRoute.params.pipe(
            switchMap(x => {
                return this.familySer.getWithQuery('FamEstFormData='+x.id)
            }))
        this.combinedSub = combineLatest(this.countrySer.getAll(), famEstDetails$, family$).pipe(
            mergeMap(([countries, famEstDetails, family]) => {
                this.famEstDetails = map(famEstDetails, x => {
                    let country = countries.find(y => y.id == x.country)
                    return {...x, 'country': country}
                })
                this.countries=countries
                this.countryAgged = this.calcTotalMatrix()
                this.family = family[0]
                let appl$ = this.applSer.getWithQuery('family='+family[0].id)
                let applDet$ = this.applDetSer.getWithQuery('family='+family[0].id)
                return combineLatest(appl$, applDet$)
            })).subscribe(([applications, applDetails]) => {
                let appls_temp = applications.map(appl => {
                    let x = applDetails.find(det => det.application == appl.id)
                    let y = this.countries.find(c => c.id == appl.country)
                    console.log('this.countries', this.countries)
                    console.log('appl', appl)
                    return {...appl, 'appl_details': x, 'country': y }
                })
                this.applications = appls_temp
            })
    }

    ngOnInit(): void {
        console.log('countryAgged', this.countryAgged)
    }

    ngOnChanges(): void {
        console.log('countryAgged', this.countryAgged)
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
        console.log('this.', this.countryAgged)
        console.log('sheeet', sheetCountries)
        for (let c of sheetCountries){
            console.log('ccc', c)
        }
        this.convert_collection_nested_json_to_aoa(sheetCountries)


        XLSX.writeFile(wb, 'out.xlsb')
    }

    calcLawFirmTot(famEstDetails: any){
        let zoom = [{'id': 22, 'country': 3, 'year': 2021, 'official_cost_sum': 500,
                     'law_firm_cost_sum': 74, 'total_cost_sum': 574.00},
                    {'id': 23, 'country': 3, 'year': 2023, 'official_cost_sum': 6000.00,
                     'law_firm_cost_sum': 565, 'total_cost_sum': 6565.00}]
        famEstDetails = famEstDetails.concat(zoom)
        let bob=reduce(famEstDetails, function (obj: any, item: any){
            var index = item.year
            if (item.law_firm_cost_sum != undefined){
                obj[item.year] = item.law_firm_cost_sum
            } else{
                obj[item.year] = 0
            }
            console.log('obj', obj)
            return obj
        },{})
        bob['type']='total_law_firm_costs'
        console.log('bob', bob)
        return bob
    }
    calcOfficialCost(famEstDetails: any){
        let zoom = [{'id': 22, 'country': 3, 'year': 2021, 'official_cost_sum': 500,
                     'law_firm_cost_sum': 74, 'total_cost_sum': 574.00},
                    {'id': 23, 'country': 3, 'year': 2023, 'official_cost_sum': 6000.00,
                     'law_firm_cost_sum': 565, 'total_cost_sum': 6565.00}]
        famEstDetails = famEstDetails.concat(zoom)
        let bob=reduce(famEstDetails, function (obj: any, item: any){
            var index = item.year
            if (item.official_cost_sum != undefined){
                obj[item.year] = item.official_cost_sum
            } else{
                obj[item.year] = 0
            }
            console.log('obj', obj)
            return obj
        },{})
        bob['type']='total_official_costs'
        console.log('bob', bob)
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

    calcTotalMatrix(){
        let grouped_ests = groupBy(this.famEstDetails, 'country.id')
        console.log('grouped_ests', grouped_ests)
        let countryAgged = map(grouped_ests, x =>{
            let sam = keyBy(x, function(o){
                return JSON.stringify(o.year)
            })
            let years = mapValues(sam, function(o){
                return o['total_cost_sum']
            })
            return assign({'country' : x[0].country}, years)
        })
        console.log('this.coudsfsdf', countryAgged)
        let min_max_year = this.findMinMaxYear(countryAgged)
        //create list of year keys
        let year_keys ={}
        let year = min_max_year['min_year']
        while (year <= min_max_year['max_year']){
            year_keys = assign(year_keys, {[year]:0})
            console.log('year_keys', year_keys)
            year += 1
        }
        // for every key that does not exist in object insert into new
        each(countryAgged, (obj) => {
            console.log('obj, ', year_keys)
            defaults(obj, year_keys)
        })
        console.log('countryAgged', countryAgged)
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

    calcTotal(){
        // aggregate data together
        let bob=values(this.famEstDetails.reduce(function (obj: any, item){
            var index = item.year
            obj[index] = {
                year: index,
                cost: (obj[index] && obj[index].total_cost_sum || 0) + item.total_cost_sum}
            return obj
        },{}))
        return bob
    }
    convert_collection_json_to_aoa(collection:any){
        let keys = this.json_to_aoa_keys(collection[0])
        let accumulator=[keys]
        for (let item of collection){
            item.country = item.country.country
            let bob = accumulator.push(this.json_to_aoa(item))
        }
        console.log('accumu', accumulator)
        return accumulator
    }
    convert_collection_nested_json_to_aoa(collection:any){
        let keys = this.json_to_aoa_keys(collection[0])
        let accumulator=[keys]
        for (let item of collection){
            item.country = item.country.country
            for (let k in item){
                console.log('k',k)

            }
            let bob = accumulator.push(this.json_to_aoa(item))
        }
        console.log('accumu', accumulator)
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
