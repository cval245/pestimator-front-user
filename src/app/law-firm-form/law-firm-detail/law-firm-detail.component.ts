import {Component, OnInit} from '@angular/core';
import {LawFirm} from "../../_models/law-firm.model";
import {Country} from "../../_models/Country.model";
import {combineLatest, Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {CountryService} from "../../_services/country.service";
import {LawfirmImageUploadService} from "../../_services/lawfirm-image-upload.service";
import {first, switchMap, takeUntil} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {MatDialog} from "@angular/material/dialog";
import {LawFirmModalComponent} from "../law-firm-modal/law-firm-modal.component";
import {LawfirmFullService} from "../../_services/lawfirm-full.service";
import {cloneDeep} from "lodash";

@Component({
  selector: 'app-law-firm-detail',
  templateUrl: './law-firm-detail.component.html',
  styleUrls: ['./law-firm-detail.component.scss']
})
export class LawFirmDetailComponent implements OnInit {
  public lawFirm: LawFirm = new LawFirm()
  public countries: Country[] = new Array<Country>()
  private nameslug: string = ''
  private destroy: Subject<void> = new Subject<void>()
  public image_url: string = ''

  constructor(private router: Router,
              private lawFirmSer: LawfirmFullService,
              private location: Location,
              private countrySer: CountryService,
              private lawFirmImgUplSer: LawfirmImageUploadService,
              public dialog: MatDialog,
              private route: ActivatedRoute) {
      this.subs().subscribe(([lawFirm, countries]) => {
        this.countries = countries
        this.lawFirm = lawFirm[0]
        this.lawFirm = this.addCountry(this.lawFirm)
        this.image_url = environment.API_URL + 'get-law-firm-image/' + this.lawFirm.image_location
      })
  }

  subs() {
    return this.route.params
      .pipe(
        takeUntil(this.destroy),
        switchMap(x => {
          this.nameslug = x.nameslug
          return combineLatest([
            this.lawFirmSer.getWithQueryByNameslugUnlessLoaded(x.nameslug),
            this.countrySer.getAllUnlessAlreadyLoaded(),
          ])
        })).pipe(takeUntil(this.destroy))
  }

  addCountry(lawFirm: LawFirm): LawFirm {
    let country = this.countries.find(y => y.id == lawFirm.country)
    lawFirm = {...lawFirm, country: country}
    return lawFirm
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

  uploadFile(event: Event) {
    //@ts-ignore
    let file = event.target.files[0]
    this.lawFirmImgUplSer.post(file, this.lawFirm).pipe(first(), takeUntil(this.destroy)).subscribe()
  }

  openForm() {
    let lawFirm = cloneDeep(this.lawFirm)

    let dialogRef = this.dialog.open(LawFirmModalComponent, {
      width: '500px',
      data: lawFirm
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.event == 'save') {
          this.onSubmit(result.data)
        }
      }
    })
  }

  onSubmit(lawFirm: LawFirm) {
    let submit_lawFirm = {...lawFirm, country: lawFirm.country.id}
    this.destroy.next()
    if (lawFirm.id == 0) {
      this.lawFirmSer.add(submit_lawFirm).pipe(takeUntil(this.destroy)).subscribe(x => {
        this.lawFirm = this.addCountry(x)
        this.router.navigate(['/law-firm-form/' + x.slug])
      })
    } else {
      this.lawFirmSer.update(submit_lawFirm).pipe(takeUntil(this.destroy)).subscribe(x => {
        this.lawFirm = this.addCountry(x)
        this.nameslug = x.slug
        this.router.navigate(['/law-firm-form/' + x.slug])
      })
    }
  }
}
