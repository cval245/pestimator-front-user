import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICustomFilTrans } from '../_models/CustomFilTrans.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Country } from 'src/app/characteristics/_models/Country.model';
import { ApplType } from 'src/app/characteristics/_models/applType.model';
import { concat, dropRight } from 'lodash';


@Component({
  selector: 'app-trans-form-table',
  templateUrl: './trans-form-table.component.html',
  styleUrls: ['./trans-form-table.component.scss']
})
export class TransFormTableComponent implements OnInit {
  @Input() country: Country = new Country(0,'','')
  @Input() applTypes: ApplType[] = [new ApplType]
  @Input() cstmFilTrans = new Array<ICustomFilTrans>()
  @Output() formData = new EventEmitter
  @Output() delEmit = new EventEmitter
  editingRow: number = 0;
  displayedColumns: string[] = ['id', 'prev_appl_type', 
                                 'appl_type', 'date_diff']
  public form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id : [undefined],
      country: ['', Validators.required],
      date_diff: ['', Validators.required],
      appl_type: ['', Validators.required],
      prev_appl_type: ['']
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(){
    console.log('cddd', this.cstmFilTrans)
  }
  newRow(){
    this.cstmFilTrans = concat(this.cstmFilTrans, {id: 0,
      country:'',date_diff:'', appl_type: '', prev_appl_type: ''})
  }
  editRow(row: ICustomFilTrans) {
    console.log('rowo', row)
    this.editingRow = row.id!
    if (row.prev_appl_type == undefined){
      row.prev_appl_type = ''
    }
    this.form.setValue({
      id: row.id,
      country: row.country,
      date_diff: row.date_diff,
      appl_type: row.appl_type,
      prev_appl_type: row.prev_appl_type,
    })
    console.log('editing row', row)
  }

  submit(){
    console.log('form = ', this.form)
    this.form.patchValue({country: this.country})
    this.formData.emit(this.form.value)
  }
  cancel(){
    if (this.form.controls.id.value == undefined){
      this.cstmFilTrans= dropRight(this.cstmFilTrans, 1)
    }
    console.log('cancel')
    this.editingRow = 0
    this.form.reset()
  }
  delete(row: ICustomFilTrans) {
    this.delEmit.emit(row.id)
  }
}
