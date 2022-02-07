import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDetailedFeeCategory} from "../_models/DetailedFeeCategory.model";
import {GridApi, GridOptions, Module, ValueFormatterParams} from "@ag-grid-community/core";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {Country} from "../../_models/Country.model";

@Component({
  selector: 'app-detailed-fee-category-form',
  templateUrl: './detailed-fee-category-form.component.html',
  styleUrls: ['./detailed-fee-category-form.component.scss']
})
export class DetailedFeeCategoryFormComponent implements OnInit {

  @Input() detailedFeeCategories: IDetailedFeeCategory[] = new Array<IDetailedFeeCategory>();
  @Input() countries: Country[] = new Array<Country>();
  @Output() formData: EventEmitter<IDetailedFeeCategory> = new EventEmitter()
  @Output() delEmit: EventEmitter<IDetailedFeeCategory[]> = new EventEmitter()
  public columnDefs: any
  public params: any
  public defaultColDef = {
    resizable: true,
  };
  public headerHeight: number = 100;
  public getRowNodeId = function (data: any) {
    return data.id
  }
  public rowSelection = 'multiple';
  public floatingFiltersHeight = 50;
  public modules: Module[] = [ClientSideRowModelModule];
  private gridApi: GridApi = new GridApi()
  public gridOptions: GridOptions = {}
  private gridColumnApi: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.columnDefs = [
      {
        field: 'name', headerName: 'Name', editable: true,
        width: 500,
        sortable: true, filter: 'agTextColumnFilter',
        valueFormatter(row: ValueFormatterParams): string {
          return row.value
        },
        cellEditor: 'agTextCellEditor',
      },
      {
        field: 'country', headerName: 'Country', editable: true,
        width: 250,
        sortable: true, filter: 'agTextColumnFilter',
        valueFormatter(row: ValueFormatterParams): string {
          return row.value.long_name
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: this.countries}
      }
    ]
  }

  agInit(params: any): void {
    this.params = params
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  isValid(x: any) {
    if (x.name == '') {
      return false
    }
    if (x.country.id == 0) {
      return false
    }
    return true
  }

  onCellValueChanged(params: any) {
    if (params.newValue !== params.oldValue) {
      if (this.isValid(params.data)) {
        this.formData.emit(params.data)
      }
    }
  }

  addRow(addIndex?: number) {
    let newRow = {
      id: 0,
      name: '',
      country: new Country(),
    }
    let newAppls = this.detailedFeeCategories.slice()
    newAppls.push(newRow)
    this.detailedFeeCategories = newAppls
  }

  deleteRow = () => {
    let row_new_list = this.gridApi.getSelectedRows().filter(x => x.id == 0)
    this.detailedFeeCategories = this.detailedFeeCategories.filter(x => x != row_new_list.find(y => y == x))
    let row_list = this.gridApi.getSelectedRows().filter(x => x.id != 0)

    this.delEmit.emit(row_list)
  }

  removeFilters() {
    this.gridApi.setFilterModel(null);
  }

}
