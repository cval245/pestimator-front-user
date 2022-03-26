import {Component, OnDestroy, OnInit} from '@angular/core';
import {FamEstGuestService} from "../../_services/fam-est-guest.service";
import {takeUntil} from "rxjs/operators";
import {combineLatest, Subject} from "rxjs";
import {Country} from 'src/app/_models/Country.model';
import {CountryService} from "../../_services/country.service";
import {FamEstFree} from "../../_models/FamEstFree.model";
import {FamEstDetailGuestService} from "../../_services/fam-est-detail-guest.service";
import {FamEstDetail} from 'src/app/_models/FamEstDetail.model';
import {assign, defaults, each, groupBy, keyBy, map, mapValues, reduce, sortBy} from "lodash";
import {CountryAggedWise} from "../../estimations-detail-page/fam-est-detail/fam-est-detail.component";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  private destroy: Subject<void> = new Subject<void>()
  public famEsts: FamEstFree[] = new Array<FamEstFree>()
  public famEstDetails: FamEstDetail[] = new Array<FamEstDetail>()
  public countryAgged: CountryAggedWise[] = new Array<CountryAggedWise>()
  public countries: Country[] = new Array<Country>()

  constructor(private famEstGuestSer: FamEstGuestService,
              private countrySer: CountryService,
              private famEstDetGuestSer: FamEstDetailGuestService) {

    combineLatest([
      this.countrySer.getAllUnlessAlreadyLoaded(),
      this.famEstGuestSer.getAllUnlessAlreadyLoaded()
    ])
      .pipe(takeUntil(this.destroy))
      .subscribe(x => {
        this.countries = x[0]
        this.famEsts = x[1]
        this.countries = this.countries.sort((a, b) => {
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
        this.famEsts = this.famEsts.map(y => {
          let country = this.countries.find(z => z.id == y.country)!
          return {...y, 'country': country}
        })
        this.countries = this.countries.filter(y => y.country !== 'EP')
      })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }

  changedCountry(country: Country) {
    let famEst = this.famEsts.find(y => y.country == country)!
    this.famEstDetGuestSer.getWithQueryByFamEstFormDataUDNUnlessLoaded(famEst.famestformdata_udn)
      .pipe(takeUntil(this.destroy))
      .subscribe(x => {
        this.famEstDetails = x.map(y => {
          let country = this.countries.find(z => z.id == y.country)!
          return {...y, country: country}
        })
        this.countryAgged = this.calcTotalMatrix()
      })
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

}
