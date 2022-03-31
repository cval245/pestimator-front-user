import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {LawFirm} from "../../_models/law-firm.model";
import {MatDialog} from "@angular/material/dialog";
import {LawfirmFullService} from "../../_services/lawfirm-full.service";
import {takeUntil} from "rxjs/operators";
import {LawFirmModalComponent} from "../law-firm-modal/law-firm-modal.component";
import {Country} from "../../_models/Country.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-law-firm-list',
  templateUrl: './law-firm-list.component.html',
  styleUrls: ['./law-firm-list.component.scss']
})
export class LawFirmListComponent implements OnInit {

  private destroy: Subject<void> = new Subject<void>()
  public lawFirms: LawFirm[] = new Array<LawFirm>()

  constructor(private lawFirmFullSer: LawfirmFullService,
              public dialog: MatDialog,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.lawFirmFullSer.getAllUnlessAlreadyLoaded()
      .pipe(takeUntil(this.destroy))
      .subscribe(x => {
        this.lawFirms = x
      })
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }

  newLawFirm() {
    let lawFirm = new LawFirm()

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


  openForm() {
    let lawFirm = new LawFirm()
    lawFirm.country = new Country()

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
    if (lawFirm.id == 0) {
      this.lawFirmFullSer.add(submit_lawFirm).pipe(takeUntil(this.destroy)).subscribe(x => {
        // this.router.navigate(['../' + x.slug])
      })
    } else {
      this.lawFirmFullSer.update(submit_lawFirm).pipe(takeUntil(this.destroy)).subscribe(x => {
        // this.router.navigate(['../' + x.slug])
      })
    }
  }

}
