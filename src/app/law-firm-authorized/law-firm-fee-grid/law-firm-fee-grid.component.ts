import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {Module, ValueFormatterParams, ValueGetterParams} from "@ag-grid-community/core";
import {LawFirmFee} from "../../_models/LawFirmFee.model";
import {Currency} from "../../_models/Currency.model";
import {CurrencySelectorComponent} from "../currency-selector/currency-selector.component";

@Component({
  selector: 'app-law-firm-fee-grid',
  templateUrl: './law-firm-fee-grid.component.html',
  styleUrls: ['./law-firm-fee-grid.component.scss']
})
export class LawFirmFeeGridComponent implements OnChanges {

  public defaultColDef: any = {suppressMovable: true}
  public columnDefs: any;
  public modules: Module[] = [ClientSideRowModelModule];
  @Input() lawFirmFees = new Array<LawFirmFee>()
  @Input() currencies = new Array<Currency>()
  @Input() initialCurrency = new Currency();
  @Output() formData = new EventEmitter<LawFirmFee>();
  frameworkComponents = {CurrencySelector: CurrencySelectorComponent}

  constructor() {
    this.defaultColDef = {
      resizable: true,
    };
  }

  ngOnChanges() {

    this.columnDefs = [
      {
        field: 'fee_type', headerName: 'Fee Name',
        pinned: true, lockPosition: true,
        cellClass: 'first-col',
        wrapText: true,
        autoHeight: true,
        width: 500,
        valueGetter: (params: ValueGetterParams) => {
          return params.data.fee_type
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value.fee_name
        },
      },
      {
        field: 'fee_amount', headerName: 'Fee Amount',
        pinned: true, lockPosition: true,
        editable: true,
        width: 200,
        wrapText: true,
        autoHeight: true,
        cellClass: 'second-col',
        valueFormatter: currencyFormatter,
      },
      {
        field: 'fee_amount_currency', headerName: 'Currency',
        pinned: true, lockPosition: true,
        wrapText: true,
        autoHeight: true,
        width: 100,
        editable: true,
        cellClass: 'second-col',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.fee_amount_currency
        },
        valueFormatter(row: ValueFormatterParams): string {
          return row.value.currency_name
        },
        cellEditor: 'CurrencySelector',
        cellEditorParams: {values: this.currencies, initial_currency: this.initialCurrency}
      },
    ]
  }

  onCellValueChanged(params: any) {
    if (params.newValue !== params.oldValue) {
      this.formData.emit(params.data)
    }
  }

}

function currencyFormatter(params: ValueFormatterParams) {
  return formatNumber(params.value);
}

function formatNumber(number: number) {
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
