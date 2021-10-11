import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {concat, dropRight} from 'lodash';
import {Country} from 'src/app/characteristics/_models/Country.model';

@Component({
  selector: 'app-gen-trans',
  templateUrl: './gen-trans.component.html',
  styleUrls: ['./gen-trans.component.scss']
})
export class GenTransComponent {

  @Input() tableData: any
  @Input() country: Country = new Country(0, '', '', false, false, '', '', [0], [0])
  @Output() formData = new EventEmitter
  @Output() delEmit = new EventEmitter
  editingRow: number = 0;
  public displayedColumns: string[] = ['id', 'date_diff']
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [undefined],
      country: ['', Validators.required],
      date_diff: ['', Validators.required],
    })
   }


  newRow(){
    this.tableData = concat(this.tableData, {id:'',country:'',date_diff:''})
  }

  editRow(row: any) {
    this.editingRow = row.id
    this.form.setValue({
      id: row.id,
      country: this.country.id,
      date_diff: row.date_diff,
    })
  }

  submit(){
    this.form.patchValue({country: this.country.id})
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
