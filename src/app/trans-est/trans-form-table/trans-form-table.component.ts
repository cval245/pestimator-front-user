import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ICustomFilTrans} from '../_models/CustomFilTrans.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Country} from 'src/app/characteristics/_models/Country.model';
import {ApplType} from 'src/app/characteristics/_models/applType.model';
import {concat, dropRight} from 'lodash';


@Component({
  selector: 'app-trans-form-table',
  templateUrl: './trans-form-table.component.html',
  styleUrls: ['./trans-form-table.component.scss']
})
export class TransFormTableComponent {
  @Input() country: Country = new Country(0, '', '', false, false, '', '', [0], [0])
  @Input() applTypes: ApplType[] = [new ApplType(0, '', '', [0])]
  @Input() cstmFilTrans = new Array<ICustomFilTrans>()
  @Output() formData = new EventEmitter
  @Output() delEmit = new EventEmitter
  editingRow: number = 0;
  displayedColumns: string[] = ['id', 'prev_appl_type',
    'appl_type', 'date_diff']
  public form: FormGroup;
  public applTypesCorrect: ApplType[] = [new ApplType(0, '', '', [0])]

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [undefined],
      country: ['', Validators.required],
      date_diff: ['', Validators.required],
      appl_type: ['', Validators.required],
      prev_appl_type: ['']
    })
  }

  ngOnChanges() {
    console.log('this.count', this.country.id)
    this.applTypesCorrect = this.applTypes.filter(applType => {
      return applType.country_set.some(countryId => countryId == this.country.id)
    })
    // this.form.controls.country.valueChanges.subscribe(country_id => {
    //   this.applTypesCorrect = this.applTypes.filter(applType => applType.country_set.some(countryId => countryId == country_id))
    // })
  }

  newRow() {
    this.cstmFilTrans = concat(this.cstmFilTrans, {
      id: 0,
      country: '', date_diff: '', appl_type: '', prev_appl_type: ''
    })
  }

  editRow(row: ICustomFilTrans) {
    this.editingRow = row.id!
    if (row.prev_appl_type == undefined) {
      row.prev_appl_type = ''
    }

    this.form.setValue({
      id: row.id,
      country: row.country.id,
      date_diff: row.date_diff,
      appl_type: row.appl_type,
      prev_appl_type: row.prev_appl_type,
    })
  }

  submit() {
    this.form.patchValue({country: this.country.id})
    this.formData.emit(this.form.value)
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
