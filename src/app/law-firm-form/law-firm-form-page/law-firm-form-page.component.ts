import {Component, OnInit} from '@angular/core';
import {LawFirmService} from "../../_services/law-firm.service";
import {CountryService} from "../../_services/country.service";
import {combineLatest, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {LawFirm} from "../../_models/law-firm.model";
import {Country} from "../../_models/Country.model";

@Component({
  selector: 'app-law-firm-form-page',
  templateUrl: './law-firm-form-page.component.html',
  styleUrls: ['./law-firm-form-page.component.scss']
})
export class LawFirmFormPageComponent implements OnInit {

  private destroy = new Subject()
  lawFirms: LawFirm[] = new Array<LawFirm>()
  filteredLawFirms: LawFirm[] = new Array<LawFirm>()
  countries: Country[] = new Array<Country>()
  constructor(private lawFirmSer: LawFirmService,
              private countrySer: CountryService) { }

  ngOnInit(): void {
    combineLatest([
      this.lawFirmSer.getAllUnlessAlreadyLoaded(),
      this.countrySer.getAllUnlessAlreadyLoaded()
    ]).pipe(takeUntil(this.destroy)).subscribe(x => {
      this.lawFirms = x[0]
      this.filteredLawFirms = this.lawFirms
      this.countries = x[1]
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
    })
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }

  submitLawFirm(formData: LawFirm) {

    if (formData.id == 0) {
      this.lawFirmSer.add(formData)
    } else {
      this.lawFirmSer.update(formData)
    }
  }
}
