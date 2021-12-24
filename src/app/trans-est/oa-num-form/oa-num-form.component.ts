import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {concat, dropRight} from 'lodash';
import {Country} from 'src/app/_models/Country.model';
import {ICountryOANum} from '../_models/CountryOANum.model';

@Component({
  selector: 'app-oa-num-form',
  templateUrl: './oa-num-form.component.html',
  styleUrls: ['./oa-num-form.component.scss']
})
export class OaNumFormComponent {
  @Input() country: Country = new Country()
  @Input() oanum = new Array<ICountryOANum>()
  @Output() formData = new EventEmitter
  @Output() delEmit = new EventEmitter

  editingRow: number = 0;
  displayedColumns: string[] = ['id', //'date_diff',
    'oa_total']

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [undefined],
      country: [0, Validators.required],
      //date_diff: ['', Validators.required],
      oa_total: [0, Validators.required],
    })
  }


  newRow() {
    this.oanum = concat(this.oanum, {
      id: 0,
      country: this.country,//date_diff:'',
      oa_total: 0
    })
  }

  editRow(row: ICountryOANum) {
    this.editingRow = row.id!

    this.form.setValue({
      id: row.id,
      country: row.country,
      //date_diff: row.date_diff,
      oa_total: row.oa_total,
    })
  }

  submit(){
    this.form.patchValue({country: this.country.id})
    if (this.form.controls.id.value == 0){
      this.form.patchValue({id: undefined})
    }
    this.formData.emit(this.form.value)
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
