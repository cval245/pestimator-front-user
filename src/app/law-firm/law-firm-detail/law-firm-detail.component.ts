import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LawFirmService} from "../../_services/law-firm.service";
import {LawFirm} from "../../_models/law-firm.model";
import {combineLatest, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {Location} from '@angular/common'
import {CountryService} from "../../_services/country.service";
import {Country} from "../../_models/Country.model";
import {LawfirmImageUploadService} from "../../_services/lawfirm-image-upload.service";

@Component({
  selector: 'app-law-firm-detail',
  templateUrl: './law-firm-detail.component.html',
  styleUrls: ['./law-firm-detail.component.scss']
})
export class LawFirmDetailComponent implements OnInit {
  public lawFirm: LawFirm = new LawFirm()
  public countries: Country[] = new Array<Country>()
  private destroy: Subject<void> = new Subject<void>()
  public image_url: string = ''

  constructor(private router: Router,
              private lawFirmSer: LawFirmService,
              private location: Location,
              private countrySer: CountryService,
              private lawFirmImgUplSer: LawfirmImageUploadService,
              private route: ActivatedRoute) {
    let nameslug = this.route.snapshot.paramMap.get('nameslug')!
    combineLatest([
      this.lawFirmSer.getWithQueryByNameslugUnlessLoaded(nameslug),
      this.countrySer.getAllUnlessAlreadyLoaded()
    ])
      .pipe(takeUntil(this.destroy)).subscribe(([lawFirm, countries]) => {
      this.lawFirm = lawFirm[0]
      this.countries = countries
      let country = this.countries.find(y => y.id == this.lawFirm.country)
      this.lawFirm = {...this.lawFirm, country: country}
      this.image_url = environment.API_URL + 'get-law-firm-image/' + this.lawFirm.image_location
    })
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }


  back() {
    this.location.back()
  }
}
