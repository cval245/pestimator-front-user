import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LawFirm} from "../../_models/law-firm.model";
import {Country} from "../../_models/Country.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {CountryService} from "../../_services/country.service";

@Component({
  selector: 'app-law-firm-modal',
  templateUrl: './law-firm-modal.component.html',
  styleUrls: ['./law-firm-modal.component.scss']
})
export class LawFirmModalComponent {
  public countries: Country[] = new Array<Country>()
  public destroy: Subject<void> = new Subject<void>()

  constructor(
    public dialogRef: MatDialogRef<any>,
    private countrySer: CountryService,
    @Inject(MAT_DIALOG_DATA) public lawFirm: LawFirm) {
    this.countrySer.getAllUnlessAlreadyLoaded()
      .pipe(takeUntil(this.destroy))
      .subscribe(x => this.countries = x)
  }

  cancel() {
    this.dialogRef.close({event: 'cancel'})
  }

  submitForm(lawFirm: LawFirm) {
    this.dialogRef.close({event: 'save', data: lawFirm})
  }

}
