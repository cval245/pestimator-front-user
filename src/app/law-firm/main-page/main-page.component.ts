import {Component, OnInit} from '@angular/core';
import {combineLatest, Subject} from 'rxjs';
import {LawFirm} from '../../_models/law-firm.model';
import {LawFirmService} from '../../_services/law-firm.service';
import {CountryService} from "../../_services/country.service";
import {Country} from "../../_models/Country.model";
import {takeUntil} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {jurisdiction} from "../../store/actions/law-firm-jurisdiction.action";
import {cloneDeep} from "lodash";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  lawFirms: LawFirm[] = new Array<LawFirm>()
  filteredLawFirms: LawFirm[] = new Array<LawFirm>()
  countries: Country[] = new Array<Country>()
  private destroy = new Subject()
  public selected_jurisdiction: Country = new Country()

  constructor(private lawFirmSer: LawFirmService,
              private store: Store<{ jurisdiction: { jurisdiction: Country } }>,
              private countrySer: CountryService) {
  }

  ngOnInit(): void {
    combineLatest([
      this.lawFirmSer.getAllUnlessAlreadyLoaded(),
      this.countrySer.getAllUnlessAlreadyLoaded(),
      this.store.select('jurisdiction')
    ]).pipe(takeUntil(this.destroy)).subscribe(x => {
      this.lawFirms = x[0]
      this.filteredLawFirms = this.lawFirms
      this.countries = x[1]
      this.selected_jurisdiction = x[2].jurisdiction
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
      this.lawFirms = this.lawFirms.map(y => {
        let country = this.countries.find(z => z.id == y.country)!
        return {...y, 'country': country}
      })
      if (this.selected_jurisdiction.id != 0){
        this.filteredLawFirms = this.lawFirms.filter(y => y.country == this.selected_jurisdiction)
      }

    })
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }

  changeJuridisdiction(event: Country) {
    this.store.dispatch(jurisdiction({jurisdiction: event}))
    this.filteredLawFirms = cloneDeep(this.lawFirms.filter(y => y.country == this.selected_jurisdiction))

    if (event.id == 0){
      this.filteredLawFirms = this.lawFirms
    }
  }
}
