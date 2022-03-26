import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Country} from "../../_models/Country.model";
import {FamEstFree} from "../../_models/FamEstFree.model";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {FamEstDetail} from "../../_models/FamEstDetail.model";
import {CountryAggedWise} from "../../estimations-detail-page/fam-est-detail/fam-est-detail.component";
import {GetPdfGuestService} from "../../_services/get-pdf-guest.service";
import {GetXlsGuestService} from "../../_services/get-xls-guest.service";

@Component({
  selector: 'app-estimator',
  templateUrl: './estimator.component.html',
  styleUrls: ['./estimator.component.scss']
})
export class EstimatorComponent implements OnInit, OnDestroy {

  private destroy: Subject<void> = new Subject<void>()
  @Input() famEsts: FamEstFree[] = new Array<FamEstFree>()
  @Input() famEstDetails: FamEstDetail[] = new Array<FamEstDetail>()
  @Input() countryAgged: CountryAggedWise[] = new Array<CountryAggedWise>()
  @Input() countries: Country[] = new Array<Country>()
  @Output() countryEmitter: EventEmitter<Country> = new EventEmitter<Country>()
  countrySelector: FormControl = new FormControl()
  public famEst: FamEstFree = new FamEstFree()

  constructor(private getPdfSer: GetPdfGuestService,
              private getXlsSer: GetXlsGuestService) {
  }

  ngOnInit(): void {
    this.countrySelector.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(x => {
        this.famEst = this.famEsts.find(y => y.country == x)!
        this.countryEmitter.emit(x)
      })
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }
  retrievePDF() {
    this.getPdfSer.getAndDownload(this.famEst.famestformdata_udn)
  }

  retrieveXLS() {
    this.getXlsSer.getAndDownload(this.famEst.famestformdata_udn)
  }
}
