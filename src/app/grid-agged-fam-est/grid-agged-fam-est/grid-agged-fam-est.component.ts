import {Component, Input, OnChanges} from '@angular/core';
import {RowCountryAggedWise} from "../../estimations-detail-page/fam-est-detail/fam-est-detail.component";
import {forEach, map, omit} from "lodash";
import {Module, ValueFormatterParams, ValueGetterParams} from "@ag-grid-community/core";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
// import {ValueFormatterParams} from "@ag-grid-community/core";
// import {ValueGetterParams} from "@ag-grid-community/core";


@Component({
  selector: 'app-grid-agged-fam-est',
  templateUrl: './grid-agged-fam-est.component.html',
  styleUrls: ['./grid-agged-fam-est.component.scss']
})
export class GridAggedFamEstComponent implements OnChanges {

  public defaultColDef: any = {suppressMovable: true}
  public columnDefs: any;
  public rowData: any;
  public modules: Module[] = [ClientSideRowModelModule];
  @Input() countryAggeds: RowCountryAggedWise[] = new Array<RowCountryAggedWise>()

  constructor() {
    this.defaultColDef = {
      resizable: true,
    };
  }


  ngOnChanges() {
    let just_row_data
    let tot_col
    // this.rowData = this.countryAggeds
    this.rowData = map(this.countryAggeds, x => {
      just_row_data = omit(x.row_data, 'total')
      tot_col = x.row_data.total
      return {'row_name': x.row_name, ...x.row_data}
    })

    this.columnDefs = [{
      field: 'row_name', headerName: 'Country',
      pinned: true, lockPosition: true,
      cellClass: 'first-col',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.row_name
      }
    },
      {
        field: 'total', headerName: 'Total',
        pinned: true, lockPosition: true,
        width: 100,
        cellClass: 'second-col',
        valueFormatter: currencyFormatter,
      },
    ]
    forEach(just_row_data, (col_val, col_key) => {
      let field_name = col_key
      let columnDef = {
        field: field_name, headerName: field_name, width: 100,
        valueFormatter: currencyFormatter,
      }
      this.columnDefs.push(columnDef)
    })
  }

}

function currencyFormatter(params: ValueFormatterParams) {
  return '$' + formatNumber(params.value);
}

function formatNumber(number: number) {
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
