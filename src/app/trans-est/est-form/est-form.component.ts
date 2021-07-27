import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {concat, dropRight, takeRight} from 'lodash';
import {ApplType} from 'src/app/characteristics/_models/applType.model';
import {Country} from 'src/app/characteristics/_models/Country.model';

interface TableWise {
  id: number | undefined
  country: any,//Country | undefined,
  appl_type: any,//ApplType | undefined,
  official_cost: number,
  date_diff: string,
  conditions: any,
  law_firm_template: any,
}

@Component({
  selector: 'app-est-form',
  templateUrl: './est-form.component.html',
  styleUrls: ['./est-form.component.scss']
})
export class EstFormComponent {
  @Input() tableData: TableWise[] = new Array<TableWise>()
  @Input() country: Country = new Country(0, '', '', false, false, '', '')
  @Input() applTypes: ApplType[] = [new ApplType]
  @Output() formData = new EventEmitter
  @Output() delEmit = new EventEmitter
  editingRow: number = 0;
  public displayedColumns: string[] = ['id', 'official_cost', 'appl_type',
    'date_diff',
    'condition_claims_min', 'condition_claims_max',
    'condition_pages_min', 'condition_pages_max',
    'condition_drawings_min', 'condition_drawings_max',
    'condition_entity_size', 'law_firm_cost', 'law_firm_date_diff',
    'buttons']
                //'conditions', 'law_firm_template']
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [undefined],
      country: ['', Validators.required],
      official_cost: ['', Validators.required],
      date_diff: ['', Validators.required],
      appl_type: ['', Validators.required],
      conditions: this.fb.group({
        id: [undefined],
        condition_claims_min: [undefined],
        condition_claims_max: [undefined],
        condition_pages_min: [undefined],
        condition_pages_max: [undefined],
        condition_drawings_min: [undefined],
        condition_drawings_max: [undefined],
        condition_entity_size: [undefined],
      }),
      law_firm_template: this.fb.group({
        id: [''],
        law_firm_cost: ['', Validators.required],
        date_diff: ['', Validators.required]
      })
    })
  }


  newRow() {
    if (this.tableData.length == 0) {
      this.tableData = concat(this.tableData, {
        id: 0, country: '',
        date_diff: '',
        official_cost: 0, appl_type: '', conditions: '', law_firm_template: ''
      })

    } else if (takeRight(this.tableData, 1)[0].id != undefined &&
      takeRight(this.tableData, 1)[0].id != null &&
      takeRight(this.tableData, 1)[0].id != 0 &&
      this.editingRow == 0
    ) {
      this.tableData = concat(this.tableData, {
        id: 0, country: '',
        date_diff: '',
        official_cost: 0, appl_type: '', conditions: '', law_firm_template: ''
      })
    }

  }

  editRow(row: any) {
    this.editingRow = row.id
    this.form.patchValue({
      id: row.id,
      country: this.country,
      date_diff: row.date_diff,
      official_cost: row.official_cost,
      appl_type: row.appl_type.id,
    })
    this.form.controls.conditions.setValue({
      id: row.conditions.id,
      condition_claims_min: row.conditions.condition_claims_min,
      condition_claims_max: row.conditions.condition_claims_max,
      condition_pages_min: row.conditions.condition_pages_min,
      condition_pages_max: row.conditions.condition_pages_max,
      condition_drawings_min: row.conditions.condition_drawings_min,
      condition_drawings_max: row.conditions.condition_drawings_max,
      condition_entity_size: row.conditions.condition_entity_size,
    })
    this.form.controls.law_firm_template.setValue({
      id: row.law_firm_template.id,
      law_firm_cost: row.law_firm_template.law_firm_cost,
      date_diff: row.law_firm_template.date_diff,

    })
  }

  submit(){
    this.form.patchValue({country: this.country})
    this.formData.emit(this.form.value)

    //reset editing row
    this.editingRow = 0
  }

  cancel(){
    console.log('cancel', this.form.value)
    if (this.form.controls.id.value == 0 || this.form.controls.id.value == null){
      this.tableData = dropRight(this.tableData, 1)
    }
    console.log('this.tableData', this.tableData)
    this.editingRow = 0
    this.form.reset()
  }

  delete(row: any) {
    this.delEmit.emit(row.id)
  }

}
