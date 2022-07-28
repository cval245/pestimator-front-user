import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Country} from "../../_models/Country.model";
import {ApplType} from "../../_models/applType.model";
import {EntitySize} from "../../_models/entitySize.model";
import {IComplexConditions} from "../_models/ComplexConditions.model";
import {IComplexTimeConditions} from "../_models/IComplexTimeConditions";
import {GridApi, Module, ValueFormatterParams, ValueGetterParams, ValueSetterParams} from "@ag-grid-community/core";
import {ConditionRendererComponent} from "../condition-renderer/condition-renderer.component";
import {IDocFormat} from "../../_models/DocFormat.model";
import {IFeeCategory} from "../_models/FeeCategory.model";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {IDetailedFeeCategory} from "../_models/DetailedFeeCategory.model";
import {AppltypefilterComponent} from "../appltypefilter/appltypefilter.component";
import {DetailedFeeCategoryFilterComponent} from "../detailed-fee-category/detailed-fee-category-filter.component";


interface TableWise {
  id: number,
  official_cost: number,
  official_cost_currency: string,
  date_diff: string,
  country: any,
  appl_type: any,
  conditions: any;
  law_firm_template: any;
  description: string;
  fee_code: string;
  isa_country_fee_only: boolean;
  fee_category: any;
  detailed_fee_category: any;
  date_enabled: Date;
  date_disabled: Date;
}

@Component({
  selector: 'app-est-template-grid-v2',
  templateUrl: './est-template-grid-v2.component.html',
  styleUrls: ['./est-template-grid-v2.component.scss']
})
export class EstTemplateGridV2Component implements OnChanges {


  public columnDefs: any
  public floatingFiltersHeight: any;
  public defaultColDef: any;
  public rowSelection: any;
  private gridApi: GridApi = new GridApi()
  public params: any
  public headerHeight: number = 200;
  public getRowNodeId: any;
  public modules: Module[] = [ClientSideRowModelModule];
  @Input() rowData: TableWise[] = new Array<TableWise>();
  @Input() currencies_list: string[] = new Array<string>()
  @Input() applTypes: ApplType[] = []
  @Input() country: Country = new Country()
  @Input() countries: Country[] = []
  @Input() tableData: TableWise[] = new Array<TableWise>()
  @Input() entitySizes: EntitySize[] = [new EntitySize()]
  @Input() complexConditions: IComplexConditions[] = [{'id': 0, 'name': ''}]
  @Input() complexTimeConditions: IComplexTimeConditions[] = [{'id': 0, 'name': ''}]
  @Input() docFormats: IDocFormat[] = new Array<IDocFormat>()
  @Input() feeCategories: IFeeCategory[] = new Array<IFeeCategory>();
  @Input() detailedFeeCategories: IDetailedFeeCategory[] = new Array<IDetailedFeeCategory>();
  @Output() formData: EventEmitter<TableWise> = new EventEmitter()
  @Output() delEmit: EventEmitter<TableWise[]> = new EventEmitter()
  private gridColumnApi: any;
  //@ts-ignore
  public frameworkComponents: { conditionRenderer: ConditionRendererComponent };

  constructor() {
    this.defaultColDef = {
      resizable: true,
      autoHeight: false,
      wrapText: true,
    };
    this.rowSelection = 'multiple';
    this.getRowNodeId = function (data: any) {
      return data.id
    }
    this.floatingFiltersHeight = 50;
  }

  agInit(params: any): void {
    this.params = params
  }

  dateFormatter(params: any) {
    let date = params.value;
    if (date.valueOf() === 0) {
      return ''
    }
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
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
        field: 'date_enabled', headerName: 'Date Enabled', editable: true,
        width: 100,
        sortable: true, filter: 'agDateColumnFilter',
        valueFormatter: this.dateFormatter,
        cellEditor: 'agDateCellEditor',
      },
      {
        field: 'date_disabled', headerName: 'Date Disabled', editable: true,
        width: 100,
        sortable: true, filter: 'agDateColumnFilter',
        valueFormatter: this.dateFormatter,
        cellEditor: 'agDateCellEditor',
      },
      {
        field: 'official_cost', headerName: 'Official Cost', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
        comparator: (valueA: number, valueB: number, nodeA: any, nodeB: any, isInverted: boolean) => {
          return valueA - valueB
        },
      },
      {
        field: 'official_cost_currency', headerName: 'Official Cost Currency',
        editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.official_cost_currency
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: this.currencies_list}
      },
      {
        field: 'appl_type', headerName: 'Appl Type', editable: true,
        width: 100, sortable: true,
        // filter: 'agTextColumnFilter',
        filter: 'appltypefilter',
        valueFormatter(row: ValueFormatterParams): string {
          return row.value.application_type
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: this.applTypes},
        comparator: (valueA: ApplType, valueB: ApplType, nodeA: any, nodeB: any, isInverted: boolean) => {
          return (valueA.id - valueB.id)
        },
      },
      {
        field: 'fee_category', headerName: 'Fee Category', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueFormatter(row: ValueFormatterParams): string {
          return row.value.name
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: this.feeCategories},
        comparator: (valueA: IFeeCategory, valueB: IFeeCategory, nodeA: any, nodeB: any, isInverted: boolean) => {
          return (valueA.id - valueB.id)
        },
      },
      {
        field: 'detailed_fee_category', headerName: 'Detailed Fee Category', editable: true,
        width: 300, sortable: true,
        filter: 'detailedfeecatfilter',
        valueFormatter(row: ValueFormatterParams): string {
          return row.value.name
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: this.detailedFeeCategories},
        comparator: (valueA: IDetailedFeeCategory, valueB: IDetailedFeeCategory, nodeA: any, nodeB: any, isInverted: boolean) => {
          return (valueA.id - valueB.id)
        },
        autoHeight: true,
      },

      {
        field: 'conditions',
        headerName: 'Conditions',
        editable: 'True',
        width: 600,
        sortable: false,
        cellRenderer: 'conditionRenderer',
        cellRendererParams: {
          country: this.country,
        },
        autoHeight: true,
      },
      {
        field: 'law_firm_template.law_firm_cost', headerName: 'LawFirm Cost', editable: true,
        width: 100, sortable: true, filter: 'agTextColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.law_firm_template.law_firm_cost
        },
        valueSetter: (params: ValueSetterParams) => {
          params.data = {
            ...params.data,
            law_firm_template: {
              id: params.data.law_firm_template.id,
              law_firm_cost: params.newValue,
              law_firm_cost_currency: params.data.law_firm_template.law_firm_cost_currency,
              date_diff: params.data.law_firm_template.date_diff
            }
          }
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
          params.data = {
            ...params.data,
            law_firm_template: {
              id: params.data.law_firm_template.id,
              law_firm_cost: params.data.law_firm_template.law_firm_cost,
              law_firm_cost_currency: params.newValue,
              date_diff: params.data.law_firm_template.date_diff
            }
          }
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
          params.data = {
            ...params.data,
            law_firm_template: {
              id: params.data.law_firm_template.id,
              law_firm_cost: params.data.law_firm_template.law_firm_cost,
              law_firm_cost_currency: params.data.law_firm_template.law_firm_cost_currency,
              date_diff: params.newValue
            }
          }
          this.onCellValueChanged(params)
          return false
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
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
        width: 200, sortable: true, filter: 'agTextColumnFilter',
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
    ];
    this.frameworkComponents = {
      //@ts-ignore
      conditionRenderer: ConditionRendererComponent,
      appltypefilter: AppltypefilterComponent,
      detailedfeecatfilter: DetailedFeeCategoryFilterComponent,
      // conditionRenderer: new ConditionRendererComponent()
    }
  }

  addRow(addIndex?: number) {
    let newRow = {
      id: 0,
      date_diff: 'P0D',
      country: this.country,
      appl_type: new ApplType(),
      official_cost: 0,
      official_cost_currency: this.country.currency_name,
      fee_code: 'default',
      description: 'default',
      date_enabled: new Date(),
      date_disabled: new Date(),
      isa_country_fee_only: false,
      fee_category: {id: 0, name: 'default'} as IFeeCategory,
      detailed_fee_category: {id: 0, name: 'default'} as IDetailedFeeCategory,
      law_firm_template: {id: 0, law_firm_cost: 0, law_firm_cost_currency: 'USD', date_diff: 'P0D'},
      conditions: {id: 0, condition_annual_prosecution_fee: false},
    }

    let newAppls = this.rowData.slice()
    newAppls.push(newRow)
    this.rowData = newAppls
  }

  deleteRow = () => {
    let row_new_list = this.gridApi.getSelectedRows().filter(x => x.id == 0)
    this.rowData = this.rowData.filter(x => x != row_new_list.find(y => y == x))
    // this.rowData = rowData
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
        // params.data.appl_type = params.data.appl_type.id
        // params.data.country = this.country.id
        // params.data.fee_category = params.data.fee_category.id
        // params.data.detailed_fee_category = params.data.detailed_fee_category.id

        if (params.data.conditions.language) {
          if (params.data.conditions.language.id == 0) {
            params.data.conditions.language = null
          } else {
            params.data.conditions.language = params.data.conditions.language.id
          }
        }

        if (params.data.conditions.condition_entity_size) {
          if (params.data.conditions.condition_entity_size.id == 0) {
            params.data.conditions.condition_entity_size = null
          } else {
            params.data.conditions.condition_entity_size = params.data.conditions.condition_entity_size.id
          }
        }

        if (params.data.conditions.doc_format) {
          if (params.data.conditions.doc_format.id == 0) {
            params.data.conditions.doc_format = null
          } else {
            params.data.conditions.doc_format = params.data.conditions.doc_format.id
          }
        }
        if (params.data.conditions.condition_complex) {
          if (params.data.conditions.condition_complex.id == 0) {
            params.data.conditions.condition_complex = null
          } else {
            params.data.conditions.condition_complex = params.data.conditions.condition_complex.id
          }
        }
        if (params.data.conditions.condition_time_complex) {
          if (params.data.conditions.condition_time_complex.id == 0) {
            params.data.conditions.condition_time_complex = null
          } else {
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
    if (tableWise.fee_category.id == 0) {
      return false
    }
    if (tableWise.detailed_fee_category.id == 0) {
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

  onFirstDataRendered(params: any) {
    // params.api.sizeColumnsToFit()
  }

  // isEmpty(rowData: TableWise[]) {
  //   return isEmpty(rowData)
  //
  // }
}
