import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Country} from "../../_models/Country.model";
import {ApplType} from "../../_models/applType.model";
import {EntitySize} from "../../_models/entitySize.model";
import {IComplexConditions} from "../_models/ComplexConditions.model";
import {IComplexTimeConditions} from "../_models/IComplexTimeConditions";
import {
  GridApi,
  GridOptions,
  Module,
  ValueFormatterParams,
  ValueGetterParams,
  ValueSetterParams
} from "@ag-grid-community/core";
import {ConditionRendererComponent} from "../condition-renderer/condition-renderer.component";
import {IDocFormat} from "../../_models/DocFormat.model";
import {IFeeCategory} from "../_models/FeeCategory.model";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {IDetailedFeeCategory} from "../_models/DetailedFeeCategory.model";


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
  fee_category: any;
  detailed_fee_category: any;
}

@Component({
  selector: 'app-est-template-grid-v2',
  templateUrl: './est-template-grid-v2.component.html',
  styleUrls: ['./est-template-grid-v2.component.scss']
})
export class EstTemplateGridV2Component implements OnInit {


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
      autoHeight: true,
      wrapText: true,
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
        width: 100, sortable: true, filter: 'agTextColumnFilter',
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
        width: 300, sortable: true, filter: 'agTextColumnFilter',
        valueFormatter(row: ValueFormatterParams): string {
          return row.value.name
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: this.detailedFeeCategories},
        comparator: (valueA: IDetailedFeeCategory, valueB: IDetailedFeeCategory, nodeA: any, nodeB: any, isInverted: boolean) => {
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
        width: 200, sortable: true, filter: 'agTextColumnFilter',
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
          return row.value
        },
        cellEditor: 'agTextCellEditor',
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
    ];
    this.frameworkComponents = {
      //@ts-ignore
      conditionRenderer: ConditionRendererComponent
      // conditionRenderer: new ConditionRendererComponent()
    }
  }

  addRow(addIndex?: number) {
    let newRow = {
      id: 0,
      date_diff: '',
      country: this.country,
      appl_type: 0,
      official_cost: 0,
      official_cost_currency: this.country.currency_name,
      fee_code: '',
      description: '',
      isa_country_fee_only: false,
      fee_category: {} as IFeeCategory,
      detailed_fee_category: {} as IDetailedFeeCategory,
      law_firm_template: {id: 0, law_firm_cost: 0, date_diff: ''},
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
        params.data.appl_type = params.data.appl_type.id
        params.data.country = this.country.id
        params.data.fee_category = params.data.fee_category.id
        params.data.detailed_fee_category = params.data.detailed_fee_category.id
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
