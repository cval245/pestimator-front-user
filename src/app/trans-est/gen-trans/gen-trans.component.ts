import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {concat, dropRight} from 'lodash';
import {Country} from 'src/app/_models/Country.model';
import {ITransComplexTime} from "../_models/TransComplexTime";
import {ApplType} from "../../_models/applType.model";

@Component({
  selector: 'app-gen-trans',
  templateUrl: './gen-trans.component.html',
  styleUrls: ['./gen-trans.component.scss']
})
export class GenTransComponent implements OnChanges {

  @Input() tableData: any
  @Input() transComplexTimes = new Array<ITransComplexTime>()
  @Input() country: Country = new Country()
  @Input() applTypes = new Array<ApplType>()
  @Output() formData = new EventEmitter
  @Output() delEmit = new EventEmitter
  public applTypesCorrect: ApplType[] = [new ApplType()]
  editingRow: number = 0;
  public displayedColumns: string[] = ['id', 'date_diff', 'appl_type',
    'prev_appl_type', 'trans_complex_time_condition']
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [undefined],
      country: ['', Validators.required],
      date_diff: ['', Validators.required],
      appl_type: ['', Validators.required],
      prev_appl_type: ['', Validators.required],
      trans_complex_time_condition: [null]
    })
  }

  ngOnChanges() {
    this.applTypesCorrect = this.applTypes.filter(applType => {
      return applType.country_set.some(countryId => countryId == this.country.id)
    })
  }

  newRow() {
    this.tableData = concat(this.tableData, {
      id: 0,
      country: '',
      date_diff: '',
      appl_type: 0,
      prev_appl_type: null,
      trans_complex_time_condition: null
    })
  }

  editRow(row: any) {
    this.editingRow = row.id
    this.form.setValue({
      id: row.id,
      country: this.country.id,
      appl_type: row.appl_type.id,
      prev_appl_type: row.prev_appl_type ? row.prev_appl_type.id : null,
      date_diff: row.date_diff,
      trans_complex_time_condition: row.trans_complex_time_condition ? row.trans_complex_time_condition : null
    })
  }

  submit() {
    this.form.patchValue({country: this.country.id})
    if (this.form.controls.appl_type.value.id) {
      this.form.patchValue({appl_type: this.form.controls.appl_type.value.id})
    }
    if (this.form.controls.prev_appl_type.value) {
      if (this.form.controls.prev_appl_type.value.id) {
        this.form.patchValue({prev_appl_type: this.form.controls.prev_appl_type.value.id})
      }
    }
    if (this.form.controls.trans_complex_time_condition.value) {
      if (this.form.controls.trans_complex_time_condition.value.id) {
        this.form.patchValue({trans_complex_time_condition: this.form.controls.trans_complex_time_condition.value.id})
      }
    }
    this.formData.emit(this.form.value)
    this.editingRow = 0
  }

  cancel(){
    if (this.form.controls.id.value == undefined){
      this.tableData = dropRight(this.tableData, 1)
    }
    this.editingRow = 0
    this.form.reset()
  }
  delete(row: any) {
    this.delEmit.emit(row.id)
  }
}
