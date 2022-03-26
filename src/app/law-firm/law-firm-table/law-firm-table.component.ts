import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {LawFirm} from "../../_models/law-firm.model";
import {Country} from "../../_models/Country.model";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-law-firm-table',
  templateUrl: './law-firm-table.component.html',
  styleUrls: ['./law-firm-table.component.scss']
})
export class LawFirmTableComponent implements OnInit, OnChanges {

  @Input() lawFirms: LawFirm[] = new Array<LawFirm>()
  @Input() countries: Country[] = new Array<Country>()
  @Input() selected_jurisdiction: Country = new Country()
  @Output() changeJurisdiction = new EventEmitter()
  countrySelector: FormControl = new FormControl()
  private filtered: boolean = false

  constructor() {
  }

  ngOnInit(): void {
    this.countrySelector.valueChanges.subscribe(x => {
      this.filtered = true
      this.changeJurisdiction.emit(x)
    })
  }

  ngOnChanges(): void {
    if (this.selected_jurisdiction.id != 0 && !this.filtered){
      this.filtered = true
      this.countrySelector.patchValue(this.selected_jurisdiction)
    }
    if (!this.filtered) {
    }
  }

  removeFilter(): void {
    this.filtered = false
    this.countrySelector.patchValue(new Country())
    this.changeJurisdiction.emit(new Country())
  }

}
