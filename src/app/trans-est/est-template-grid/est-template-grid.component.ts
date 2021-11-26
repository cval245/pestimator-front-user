import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GridApi, GridOptions, ValueFormatterParams,} from "@ag-grid-community/core";
import {Country} from "../../characteristics/_models/Country.model";
import {ApplType} from "../../characteristics/_models/applType.model";
import {EntitySize} from "../../characteristics/_models/entitySize.model";
import {IComplexConditions} from "../_models/ComplexConditions.model";
import {IComplexTimeConditions} from "../_models/IComplexTimeConditions";
import {FirstDataRenderedEvent, ValueGetterParams, ValueSetterParams} from "ag-grid-community";


interface TableWise {
  id: number,
  official_cost: number,
  official_cost_currency: string,
  date_diff: string,
  country: any,//Country | undefined,
  appl_type: any,//ApplType | undefined,
  conditions: any;
  law_firm_template: any;
  description: string;
  fee_code: string;
  isa_country_fee_only: boolean;
}


@Component({
  selector: 'app-est-template-grid',
  templateUrl: './est-template-grid.component.html',
  styleUrls: ['./est-template-grid.component.scss']
})
export class EstTemplateGridComponent implements OnInit {


  public columnDefs: any
  public datasource: any
  public floatingFiltersHeight: any;
  public defaultColDef: any;
  public rowSelection: any;
  private gridApi: GridApi = new GridApi()
  public gridOptions: GridOptions = {}
  public params: any
  public headerHeight: number = 200;
  public getRowNodeId: any;
  @Input() rowData: TableWise[] = new Array<TableWise>();
  // @Input() currencies: Currency[] = new Array<Currency>()
  @Input() currencies_list: string[] = new Array<string>()
  @Input() applTypes: ApplType[] = []
  @Input() country: Country = new Country()
  @Input() countries: Country[] = []
  @Input() tableData: TableWise[] = new Array<TableWise>()
  @Input() entitySizes: EntitySize[] = [new EntitySize()]
  @Input() complexConditions: IComplexConditions[] = [{'id': 0, 'name': ''}]
  @Input() complexTimeConditions: IComplexTimeConditions[] = [{'id': 0, 'name': ''}]
  @Output() formData: EventEmitter<TableWise> = new EventEmitter()
  @Output() delEmit: EventEmitter<TableWise[]> = new EventEmitter()
  private gridColumnApi: any;
  // private defaultEntitySize: EntitySize = new EntitySize();

  constructor() {
    this.defaultColDef = {
      // flex: 1,
      resizable: true,
    };
    this.rowSelection = 'multiple';
    this.getRowNodeId = function (data: any) {
      return data.id
    }
    this.floatingFiltersHeight = 50;
  }

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params
  }

  ngOnChanges(): void {
    this.columnDefs = [
      {
        field: 'date_diff', headerName: 'Date Diff', editable: true,
        width: 100,
        sortable: true, filter: 'agTextColumnFilter',
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
      {
        field: 'official_cost', headerName: 'Official Cost', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
        comparator: (valueA: number , valueB: number, nodeA: any, nodeB:any, isInverted: boolean) =>{
          return valueA - valueB
        },
      },
      {
        field: 'official_cost_currency', headerName: 'Official Cost Currency',
        editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          // this.currencies.find(x => x.currency_name)
          return params.data.official_cost_currency
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: this.currencies_list}
      },
      // {field: 'country', headerName: 'Country', editable: true,
      //   sortable: true, filter: 'agTextColumnFilter',
      //   valueFormatter(row: ValueFormatterParams): string {
      //     return row.value.long_name//.country.long_name
      //   },
      //   cellEditor: 'agSelectCellEditor',
      //   cellEditorParams: {values: this.countries}
      // },
      {
        field: 'appl_type', headerName: 'Appl Type', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueFormatter(row: ValueFormatterParams): string {
          // console.log('applyType', row.value.application_type)
          return row.value.application_type
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: this.applTypes},
        comparator: (valueA: ApplType, valueB: ApplType, nodeA: any, nodeB:any, isInverted: boolean) =>{
          return (valueA.id - valueB.id)
        },
      },
      {
        field: 'fee_code', headerName: 'Fee Code', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
      {
        field: 'description', headerName: 'Description', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
      {
        field: 'law_firm_template.law_firm_cost', headerName: 'LawFirm Cost', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.law_firm_template.law_firm_cost
        },
        valueSetter: (params: ValueSetterParams) => {
          let newData = {
            ...params.data,
            law_firm_template: {
              id: params.data.law_firm_template.id,
              law_firm_cost: params.newValue,
              law_firm_cost_currency: params.data.law_firm_template.law_firm_cost_currency,
              date_diff: params.data.law_firm_template.date_diff
            }
          }
          params.data = newData
          this.onCellValueChanged(params)
          return false
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
      {
        field: 'law_firm_template.law_firm_cost_currency', headerName: 'LawFirm Cost Currency', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.law_firm_template.law_firm_cost_currency
        },
        valueSetter: (params: ValueSetterParams) => {
          let newData = {
            ...params.data,
            law_firm_template: {
              id: params.data.law_firm_template.id,
              law_firm_cost: params.data.law_firm_template.law_firm_cost,
              law_firm_cost_currency: params.newValue,
              date_diff: params.data.law_firm_template.date_diff
            }
          }
          params.data = newData
          this.onCellValueChanged(params)
          return false
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: this.currencies_list}
      },
      {
        field: 'law_firm_template.date_diff', headerName: 'LawFirm Date Diff',
        editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.law_firm_template.date_diff
        },
        valueSetter: (params: ValueSetterParams) => {
          let newData = {
            ...params.data,
            law_firm_template: {
              id: params.data.law_firm_template.id,
              law_firm_cost: params.data.law_firm_template.law_firm_cost,
              law_firm_cost_currency: params.data.law_firm_template.law_firm_cost_currency,
              date_diff: params.newValue
            }
          }
          params.data = newData
          this.onCellValueChanged(params)
          return false
        },
        valueFormatter(row: ValueFormatterParams): string {
          // console.log('law_firm data_diff', row.data.law_firm_template.date_diff)
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
      {
        field: 'conditions.condition_annual_prosecution_fee', headerName: 'Prosecution Fee', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.condition_annual_prosecution_fee
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: [false, true]}
      },
      {
        field: 'conditions.condition_annual_prosecution_fee_until_grant', headerName: 'Prosecution Fee (until Grant)', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.condition_annual_prosecution_fee_until_grant
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: [false, true]}
      },
      {
        field: 'conditions.condition_renewal_fee_from_filing_after_grant', headerName: 'Renewals Fee from filing(until Grant)', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.condition_renewal_fee_from_filing_after_grant
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: [false, true]}
      },
      {
        field: 'conditions.condition_claims_min', headerName: 'Min Claims', editable: true,
        width: 75, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.condition_claims_min
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
      {
        field: 'conditions.condition_claims_max', headerName: 'Max Claims', editable: true,
        sortable: true, filter: 'agTextColumnFilter',
        width: 75, valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.condition_claims_max
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
      {
        field: 'conditions.condition_drawings_min', headerName: 'Min Drawings', editable: true,
        width: 75, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.condition_drawings_min
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
      {
        field: 'conditions.condition_drawings_max', headerName: 'Max Drawings', editable: true,
        width: 75, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.condition_drawings_max
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
      {
        field: 'conditions.condition_indep_claims_min', headerName: 'Min Indep Claims', editable: true,
        width: 75, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.condition_indep_claims_min
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
      {
        field: 'conditions.condition_indep_claims_max', headerName: 'Max Indep Claims', editable: true,
        width: 75, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.condition_indep_claims_max
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
      {
        field: 'conditions.condition_pages_desc_min', headerName: 'Min Pages Desc', editable: true,
        width: 75, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.condition_pages_desc_min
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
      {
        field: 'conditions.condition_pages_desc_max', headerName: 'Max Pages Desc', editable: true,
        width: 75, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.condition_pages_desc_max
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
      {
        field: 'conditions.condition_pages_total_min', headerName: 'Min Pages', editable: true,
        width: 75, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.condition_pages_total_min
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
      {
        field: 'conditions.condition_pages_total_max', headerName: 'Max Pages', editable: true,
        width: 75, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.condition_pages_total_max
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
      {
        field: 'conditions.condition_entity_size', headerName: 'Entity Size', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.condition_entity_size
        },
        valueFormatter(row: ValueFormatterParams): string {
          if (row.value) {
            return row.value.entity_size
          } else {
            return 'N/A'
          }
        },
        comparator: (valueA: EntitySize, valueB: EntitySize, nodeA: any, nodeB:any, isInverted: boolean) =>{
         return (valueA.id - valueB.id)
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: this.entitySizes},
      },
      {
        field: 'conditions.condition_complex',
        headerName: 'Condition Complex',
        editable: true,
        sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.condition_complex
        },
        valueFormatter(row: ValueFormatterParams): string {
          if (row.value) {
            return row.value.name
          } else {
            return 'N/A'
          }
        },
        comparator: (valueA: IComplexConditions, valueB: IComplexConditions, nodeA: any, nodeB:any, isInverted: boolean) =>{
          return ((valueA ? valueA.id:0) - (valueB ? valueB.id: 0));
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: this.complexConditions},
      },
      {
        field: 'conditions.condition_time_complex', headerName: 'Condition Time Complex', editable: true,
        sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.condition_time_complex
        },
        valueFormatter(row: ValueFormatterParams): string {
          if (row.value) {
            return row.value.name
          } else {
            return 'N/A'
          }
        },
        comparator: (valueA: IComplexTimeConditions, valueB: IComplexTimeConditions, nodeA: any, nodeB:any, isInverted: boolean) =>{
          return ((valueA ? valueA.id:0) - (valueB ? valueB.id: 0));
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: this.complexTimeConditions},
      },
      {
        field: 'conditions.prev_appl_date_excl_intermediary_time',
        headerName: 'Prev Appl Date Excl Inter Time',
        editable: true,
        width: 100,
        sortable: true,
        filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.prev_appl_date_excl_intermediary_time
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: [false, true]}
      },
      {
        field: 'conditions.prior_pct', headerName: 'Prior Pct', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.prior_pct
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: [false, true]}
      },
      {
        field: 'conditions.prior_pct_same_country', headerName: 'Prior Pct Same Country', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.prior_pct_same_country
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: [false, true]}
      },
      {
        field: 'conditions.prior_appl_exists', headerName: 'Prior Appl Exists', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.conditions.prior_appl_exists
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: [false, true]}
      },
      {
        field: 'isa_country_fee_only', headerName: 'ISA Country Fee ONly', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.isa_country_fee_only
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: [false, true]}
      },
    ]
  }

  addRow(addIndex?: number) {
    let newRow = {
      id: 0,
      date_diff: '',
      country: this.country,
      appl_type: 0,
      official_cost: 0,
      official_cost_currency:this.country.currency_name,
      fee_code: '',
      description: '',
      isa_country_fee_only: false,
      law_firm_template: {id: 0, law_firm_cost: 0, date_diff: ''},
      conditions: {id: 0, condition_annual_prosecution_fee: false},
    }

    let newAppls = this.rowData.slice()
    newAppls.push(newRow)
    this.rowData = newAppls
  }

  deleteRow = () => {
    let row_new_list = this.gridApi.getSelectedRows().filter(x => x.id == 0)
    let rowData = this.rowData.filter(x => x != row_new_list.find(y => y == x))
    this.rowData = rowData
    let row_list = this.gridApi.getSelectedRows().filter(x => x.id != 0)

    this.delEmit.emit(row_list)
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onCellValueChanged(params: any) {
    if (params.newValue !== params.oldValue) {
      if (this.isValid(params.data)) {
        params.data.appl_type = params.data.appl_type.id
        params.data.country = this.country.id
        if (params.data.conditions.condition_entity_size) {
          if (params.data.conditions.condition_entity_size.id ==0){
            params.data.conditions.condition_entity_size = null
          }else{
            params.data.conditions.condition_entity_size = params.data.conditions.condition_entity_size.id
          }
        }
        if (params.data.conditions.condition_complex) {
          if (params.data.conditions.condition_complex.id==0){
            params.data.conditions.condition_complex = null
          }else{
            params.data.conditions.condition_complex = params.data.conditions.condition_complex.id
          }
        }
        if (params.data.conditions.condition_time_complex) {
          if (params.data.conditions.condition_time_complex.id==0){
            params.data.conditions.condition_time_complex = null
          }else{
            params.data.conditions.condition_time_complex = params.data.conditions.condition_time_complex.id
          }
        }
        this.formData.emit(params.data)
      }
    }
  }

  isValid(tableWise: TableWise) {
    if (tableWise.date_diff == '') {
      return false
    }
    if (tableWise.official_cost == null || undefined) {
      return false
    }
    if (tableWise.appl_type == 0) {
      return false
    }
    if (tableWise.fee_code == '') {
      return false
    }
    if (tableWise.description == '') {
      return false
    }
    if (tableWise.law_firm_template.date_diff == '') {
      return false
    }
    return true
  }

  removeFilters() {
    this.gridApi.setFilterModel(null);
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // params.api.sizeColumnsToFit()
  }

  // isEmpty(rowData: TableWise[]) {
  //   // console.log('isMep', rowData)
  //   // console.log('sdfs', isEmpty(rowData))
  //   return isEmpty(rowData)
  //
  // }
}
