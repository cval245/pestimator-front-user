import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {concat, dropRight} from 'lodash';
import {Country} from 'src/app/_models/Country.model';
import {ICountryOANum} from '../_models/CountryOANum.model';
import {ApplType} from "../../_models/applType.model";

@Component({
  selector: 'app-oa-num-form',
  templateUrl: './oa-num-form.component.html',
  styleUrls: ['./oa-num-form.component.scss']
})
export class OaNumFormComponent implements OnChanges {
  @Input() country: Country = new Country()
  @Input() oanum = new Array<ICountryOANum>()
  @Input() applTypes = new Array<ApplType>()
  @Output() formData = new EventEmitter
  @Output() delEmit = new EventEmitter
  public applTypesCorrect: ApplType[] = [new ApplType()]
  editingRow: number = 0;
  displayedColumns: string[] = ['id', 'appl_type', 'prev_appl_type',
    'oa_total']

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [undefined],
      country: [0, Validators.required],
      oa_total: [0, Validators.required],
      appl_type: ['', Validators.required],
      prev_appl_type: ['', Validators.required],
    })
  }

  ngOnChanges() {
    this.applTypesCorrect = this.applTypes.filter(applType => {
      return applType.country_set.some(countryId => countryId == this.country.id)
    })
  }

  newRow() {
    this.oanum = concat(this.oanum, {
      id: 0,
      country: this.country,
      appl_type: 0,
      prev_appl_type: null,
      oa_total: 0,
    })
  }

  editRow(row: ICountryOANum) {
    this.editingRow = row.id!

    this.form.setValue({
      id: row.id,
      country: row.country,
      appl_type: row.appl_type.id,
      prev_appl_type: row.prev_appl_type ? row.prev_appl_type.id : null,
      oa_total: row.oa_total,
    })
  }

  submit(){
    this.form.patchValue({country: this.country.id})
    if (this.form.controls.id.value == 0){
      this.form.patchValue({id: undefined})
    }
    this.formData.emit(this.form.value)
    this.editingRow = 0
  }
  cancel(){
    if (this.form.controls.id.value == undefined){
      this.oanum = dropRight(this.oanum, 1)
    }
    this.editingRow = 0
    this.form.reset()
  }
  delete(row: ICountryOANum) {
    this.delEmit.emit(row.id)
  }
}
