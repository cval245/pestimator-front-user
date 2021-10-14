import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {concat, dropRight, takeRight} from 'lodash';
import {ApplType} from 'src/app/characteristics/_models/applType.model';
import {Country} from 'src/app/characteristics/_models/Country.model';
import {EntitySize} from "../../characteristics/_models/entitySize.model";
import {IComplexConditions} from "../_models/ComplexConditions.model";

interface TableWise {
  id: number | undefined
  country: any,
  appl_type: any,
  official_cost: number,
  date_diff: string,
  conditions: any,
  law_firm_template: any,
  oa_final_bool: boolean,
  oa_first_final_bool: boolean,
}

@Component({
  selector: 'app-us-oa-est-form',
  templateUrl: './us-oa-est-form.component.html',
  styleUrls: ['./us-oa-est-form.component.scss']
})
export class UsOaEstFormComponent {

  @Input() tableData: TableWise[] = new Array<TableWise>()
  @Input() country: Country = new Country(0, '', '', false, false, false, '', '', [0], [0], [0])
  @Input() applTypes: ApplType[] = [new ApplType(0, '', '', [0])]
  @Input() entitySizes: EntitySize[] = [new EntitySize(0, '', '')]
  @Input() complexConditions: IComplexConditions[] = [{'id': 0, 'name': ''}]
  @Output() formData = new EventEmitter
  @Output() delEmit = new EventEmitter
  editingRow: number = 0;
  public displayedColumns: string[] = ['id', 'official_cost', 'appl_type',
    'date_diff', 'oa_final_bool', 'oa_first_final_bool',
    'prior_pct_same_country',
    'condition_claims_min', 'condition_claims_max',
    'condition_indep_claims_min', 'condition_indep_claims_max',
    'condition_pages_min', 'condition_pages_max',
    'condition_drawings_min', 'condition_drawings_max',
    'condition_entity_size', 'condition_complex',
    'law_firm_cost', 'law_firm_date_diff',
    'buttons']
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [undefined],
      country: ['', Validators.required],
      official_cost: ['', Validators.required],
      date_diff: ['', Validators.required],
      appl_type: ['', Validators.required],
      oa_final_bool: ['', Validators.required],
      oa_first_final_bool: ['', Validators.required],
      prior_pct_same_country: [false],
      conditions: this.fb.group({
        id: [undefined],
        condition_claims_min: [undefined],
        condition_claims_max: [undefined],
        condition_indep_claims_min: [undefined],
        condition_indep_claims_max: [undefined],
        condition_pages_min: [undefined],
        condition_pages_max: [undefined],
        condition_drawings_min: [undefined],
        condition_drawings_max: [undefined],
        condition_entity_size: [undefined],
        condition_complex: [undefined],
      }),
      law_firm_template: this.fb.group({
        id: [''],
        law_firm_cost: ['', Validators.required],
        date_diff: ['', Validators.required]
      })
    })
  }

  newRow(){
    if(this.tableData.length == 0){
      this.tableData = concat(this.tableData, {
        id: 0, country: '',
        date_diff: '', official_cost: 0, appl_type: '', conditions: '',
        law_firm_template: '', oa_final_bool: false, oa_first_final_bool: false
      })

    }else if(takeRight(this.tableData, 1)[0].id != undefined &&
      takeRight(this.tableData, 1)[0].id != null &&
      takeRight(this.tableData, 1)[0].id != 0 &&
      this.editingRow == 0
    ){
      this.tableData = concat(this.tableData, {
        id: 0, country: '',
        date_diff: '', official_cost: 0, appl_type: '', conditions: '',
        law_firm_template: '', oa_final_bool: false, oa_first_final_bool: false
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
      oa_final_bool: row.oa_final_bool,
      oa_first_final_bool: row.oa_first_final_bool,
      prior_pct_same_country: row.prior_pct_same_country,
    })
    this.form.controls.conditions.setValue({
      id: row.conditions.id,
      condition_claims_min: row.conditions.condition_claims_min,
      condition_claims_max: row.conditions.condition_claims_max,
      condition_indep_claims_min: row.conditions.condition_indep_claims_min,
      condition_indep_claims_max: row.conditions.condition_indep_claims_max,
      condition_pages_min: row.conditions.condition_pages_min,
      condition_pages_max: row.conditions.condition_pages_max,
      condition_drawings_min: row.conditions.condition_drawings_min,
      condition_drawings_max: row.conditions.condition_drawings_max,
      condition_entity_size: null,
      condition_complex: null,
    })
    if (row.conditions.condition_entity_size) {
      this.form.controls.conditions.patchValue({
        condition_entity_size: row.conditions.condition_entity_size.id
      })
    }
    if (row.conditions.condition_complex) {
      this.form.controls.conditions.patchValue({
        condition_complex: row.conditions.condition_complex.id
      })
    }
    this.form.controls.law_firm_template.setValue({
      id: row.law_firm_template.id,
      law_firm_cost: row.law_firm_template.law_firm_cost,
      date_diff: row.law_firm_template.date_diff,
    })
  }

  submit() {
    this.form.patchValue({country: this.country})
    if (this.form.valid) {
      this.formData.emit(this.form.value)
    }

    //reset editing row
    this.editingRow = 0
  }

  cancel(){
    if (this.form.controls.id.value == 0 || this.form.controls.id.value == null){
      this.tableData = dropRight(this.tableData, 1)
    }
    this.editingRow = 0
    this.form.reset()
  }

  delete(row: any) {
    this.delEmit.emit(row.id)
  }

}
