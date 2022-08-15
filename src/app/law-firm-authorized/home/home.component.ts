import {Component, OnInit} from '@angular/core';
import {LawFirmAuthorized} from "../../_models/law-firm-authorized";
import {LawFirmAuthorizedService} from "../../_services/law-firm-authorized.service";
import {Country} from "../../_models/Country.model";
import {LawFirm} from "../../_models/law-firm.model";
import {CountryService} from "../../_services/country.service";
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public lawFirm: LawFirmAuthorized = new LawFirmAuthorized()
  countries: Country[] = new Array<Country>()

  constructor(
    private lawSer: LawFirmAuthorizedService,
    private countrySer: CountryService
  ) {
  }

  ngOnInit(): void {
    combineLatest([
      this.countrySer.getAllUnlessAlreadyLoaded(),
      this.lawSer.getAll()
    ])
      .subscribe(([countries, lawfirm]) => {
        this.countries = countries
        this.lawFirm = {
          ...lawfirm[0], country: countries.find(country => {
            return country.id === lawfirm[0].country
          })
        };
      })
  }

  submitLawFirm(formData: LawFirm) {

    if (formData.id == 0) {
      this.lawSer.add(formData)
    } else {
      this.lawSer.update(formData)
    }
  }
}
