import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ICustomFilTrans} from '../_models/CustomFilTrans.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Country} from 'src/app/_models/Country.model';
import {ApplType} from 'src/app/_models/applType.model';
import {concat, dropRight} from 'lodash';
import {ITransComplexTime} from "../_models/TransComplexTime";
import {ITransFilReqFull} from "../_models/TransFilReq.model";


@Component({
  selector: 'app-trans-form-table',
  templateUrl: './trans-form-table.component.html',
  styleUrls: ['./trans-form-table.component.scss']
})
export class TransFormTableComponent {
  @Input() country: Country = new Country()
  @Input() applTypes: ApplType[] = [new ApplType()]
  @Input() transComplexTimes = new Array<ITransComplexTime>()
  @Input() cstmFilTrans = new Array<ICustomFilTrans>()
  @Output() formData = new EventEmitter
  @Output() delEmit = new EventEmitter
  editingRow: number = 0;
  displayedColumns: string[] = ['id', 'prev_appl_type',
    'appl_type', 'date_diff', 'trans_complex_time_condition']
  public form: FormGroup;
  public applTypesCorrect: ApplType[] = [new ApplType()]
  // @ts-ignore
  @Input() reqs: ITransFilReqFull = {} as ITransFilReqFull;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [0],
      country: ['', Validators.required],
      date_diff: ['', Validators.required],
      appl_type: ['', Validators.required],
      prev_appl_type: [''],
      trans_complex_time_condition: [null]
  })
  }

  ngOnChanges() {
    this.applTypesCorrect = this.applTypes.filter(applType => {
      return applType.country_set.some(countryId => countryId == this.country.id)
    })
  }

  newRow() {
    this.cstmFilTrans = concat(this.cstmFilTrans, {
      id: 0,
      country: '', date_diff: '', appl_type: '', prev_appl_type: '',
      trans_complex_time_condition: 0
    })
  }

  editRow(row: ICustomFilTrans) {
    this.editingRow = row.id!
    if (row.prev_appl_type == undefined) {
      row.prev_appl_type = ''
    }
    if (row.trans_complex_time_condition == undefined) {
      row.trans_complex_time_condition = 0
    }

    this.form.setValue({
      id: row.id,
      country: row.country.id,
      date_diff: row.date_diff,
      appl_type: row.appl_type.id,
      prev_appl_type: row.prev_appl_type.id,
      trans_complex_time_condition: row.trans_complex_time_condition,
    })
  }

  submit() {
    if (this.form.controls.trans_complex_time_condition.value == 0) {
      this.form.patchValue({trans_complex_time_condition: null})
    }
    if (this.form.controls.id.value == 0) {
      this.form.patchValue({id: undefined})
    }
    // if (this.form.controls.prev_appl_type.value == ''){
    //   this.form.patchValue({prev_appl_type: this.form.controls.prev_appl_type.value.id})
    // }

    this.form.patchValue({
      country: this.country.id,
      // appl_type: this.form.controls.appl_type.value.id
      // prev_appl_type: this.form.get('prev_appl_type')!.value.id
    })
    this.formData.emit(this.form.value)
    this.editingRow = 0
  }

  cancel() {
    if (this.form.controls.id.value == undefined) {
      this.cstmFilTrans = dropRight(this.cstmFilTrans, 1)
    }
    this.editingRow = 0
    this.form.reset()
  }

  delete(row: ICustomFilTrans) {
    this.delEmit.emit(row.id)
  }
}
