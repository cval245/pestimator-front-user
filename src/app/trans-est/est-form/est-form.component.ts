import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {concat, dropRight, forOwn, takeRight} from 'lodash';
import {ApplType} from 'src/app/characteristics/_models/applType.model';
import {Country} from 'src/app/characteristics/_models/Country.model';
import {EntitySize} from "../../characteristics/_models/entitySize.model";
import {IComplexConditions} from "../_models/ComplexConditions.model";
import {IComplexTimeConditions} from "../_models/IComplexTimeConditions";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

interface TableWise {
  id: number | undefined
  country: any,//Country | undefined,
  appl_type: any,//ApplType | undefined,
  official_cost: number,
  date_diff: string,
  conditions: any,
  law_firm_template: any,
}
export interface IIndexable<T = any> { [key: string]: T }
@Component({
  selector: 'app-est-form',
  templateUrl: './est-form.component.html',
  styleUrls: ['./est-form.component.scss']
})
export class EstFormComponent {
  @Input() tableData: TableWise[] = new Array<TableWise>()
  @Input() country: Country = new Country(0, '', '', false, false, false, '', '', [0], [0], [0])
  @Input() applTypes: ApplType[] = [new ApplType(0, '', '', [0])]
  @Input() entitySizes: EntitySize[] = [new EntitySize(0, '', '')]
  @Input() complexConditions: IComplexConditions[] = [{'id': 0, 'name': ''}]
  @Input() complexTimeConditions: IComplexTimeConditions[] = [{'id': 0, 'name': ''}]
  @Output() formData = new EventEmitter
  @Output() delEmit = new EventEmitter
  @ViewChild(MatSort) sort: MatSort = new MatSort()
  applTypeFilter = new FormControl()

  public dataSource = new MatTableDataSource<TableWise>()
  editingRow: number = 0;
  public displayedColumns: string[] = ['id',
    'fee_code', 'description',
    'official_cost', 'appl_type',
    'date_diff', 'prior_pct', 'prior_pct_same_country',
    'prev_appl_date_excl_intermediary_time',
    'condition_claims_min', 'condition_claims_max',
    'condition_indep_claims_min', 'condition_indep_claims_max',
    'condition_pages_min', 'condition_pages_max',
    'condition_pages_desc_min', 'condition_pages_desc_max',
    'condition_drawings_min', 'condition_drawings_max',
    'condition_entity_size', 'condition_annual_prosecution_fee',
    'condition_complex', 'condition_time_complex',
    'law_firm_cost', 'law_firm_date_diff',
    'buttons']
  //'conditions', 'law_firm_template']
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.applTypeFilter.valueChanges.subscribe(x => {
      this.dataSource = new MatTableDataSource(this.tableData)
      this.dataSource.data = this.dataSource.data.filter(y => y.appl_type.id == x)
    })
    this.form = this.fb.group({
      id: [undefined],
      country: ['', Validators.required],
      fee_code: [''],
      description: [''],
      official_cost: ['', Validators.required],
      date_diff: ['', Validators.required],
      appl_type: ['', Validators.required],
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
        condition_pages_desc_min: [undefined],
        condition_pages_desc_max: [undefined],
        condition_entity_size: [undefined],
        condition_annual_prosecution_fee: [false],
        condition_complex: [undefined],
        condition_time_complex: [undefined],
        prior_pct: [undefined],
        prior_pct_same_country: [undefined],
        prev_appl_date_excl_intermediary_time: [false],
      }),
      law_firm_template: this.fb.group({
        id: [''],
        law_firm_cost: ['', Validators.required],
        date_diff: ['', Validators.required]
      })
    })
    // this.form.valueChanges.subscribe(x => {
    //   if (this.form.valid){
    //     this.submit()
    //   }
    // })
  }
  ngOnChanges(){
    this.dataSource = new MatTableDataSource(this.tableData)
    this.dataSource.sort = this.sort
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'appl_type': return item.appl_type.application_type;
        case 'condition_pages_min': return item.conditions.condition_pages_min;
        case 'condition_pages_max': return item.conditions.condition_pages_max;
        case 'condition_pages_desc_min': return item.conditions.condition_pages_desc_min;
        case 'condition_pages_desc_max': return item.conditions.condition_pages_desc_max;
        case 'condition_claims_min': return item.conditions.condition_claims_min;
        case 'condition_claims_max': return item.conditions.condition_claims_max;
        case 'condition_indep_claims_min': return item.conditions.condition_indep_claims_min;
        case 'condition_indep_claims_max': return item.conditions.condition_indep_claims_max;
        case 'condition_drawings_min': return item.conditions.condition_drawings_min;
        case 'condition_drawings_max': return item.conditions.condition_drawings_max;
        case 'condition_entity_size': return item.conditions.condition_entity_size;
        case 'condition_annual_prosecution_fee': return item.conditions.condition_annual_prosecution_fee;
        case 'condition_complex': return item.conditions.condition_complex;
        case 'condition_time_complex': return item.conditions.condition_time_complex;
        case 'prior_pct': return item.conditions.prior_pct;
        case 'prior_pct_same_country': return item.conditions.prior_pct_same_country;
        case 'prev_appl_date_excl_intermediary_time': return item.conditions.prev_appl_date_excl_intermediary_time;
        case 'law_firm_cost': return item.law_firm_template.law_firm_cost;
        case 'date_diff': return item.law_firm_template.date_diff;
        default: return (item as IIndexable)[property]
      }
    }
  }


  newRow() {
    console.log('sdfsf', this.tableData.length)
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
      fee_code: row.fee_code,
      description: row.description,
      country: this.country,
      date_diff: row.date_diff,
      official_cost: row.official_cost,
      appl_type: row.appl_type.id,
    })
    this.form.controls.conditions.setValue({
      id: row.conditions.id,
      condition_claims_min: row.conditions.condition_claims_min,
      condition_claims_max: row.conditions.condition_claims_max,
      condition_indep_claims_min: row.conditions.condition_indep_claims_min,
      condition_indep_claims_max: row.conditions.condition_indep_claims_max,
      condition_pages_min: row.conditions.condition_pages_min,
      condition_pages_max: row.conditions.condition_pages_max,
      condition_pages_desc_min: row.conditions.condition_pages_desc_min,
      condition_pages_desc_max: row.conditions.condition_pages_desc_max,
      condition_drawings_min: row.conditions.condition_drawings_min,
      condition_drawings_max: row.conditions.condition_drawings_max,
      condition_entity_size: null,
      condition_annual_prosecution_fee: row.conditions.condition_annual_prosecution_fee,
      condition_complex: null,
      condition_time_complex: null,
      prior_pct: row.conditions.prior_pct,
      prior_pct_same_country: row.conditions.prior_pct_same_country,
      prev_appl_date_excl_intermediary_time: row.conditions.prev_appl_date_excl_intermediary_time,
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
    let data = this.form.value
    let conditions_data = forOwn(data.conditions, (value, key) => {
      if (value === "") {
        data.conditions[key] = null
      }
    })
    this.formData.emit(this.form.value)

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
