import {Component, Input, OnChanges} from '@angular/core';
import {forEach, forIn, omit} from "lodash";
// import {ValueGetterParams} from "@ag-grid-community/core";
// import {ValueFormatterParams} from "@ag-grid-community/core";
import {Country} from "../../_models/Country.model";
import {Module, ValueFormatterParams, ValueGetterParams} from "@ag-grid-community/core";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";


interface CountryAllAggedWise {
  country: Country;
  tot_agged: {
    country: Country;
    row_data: {
      [key: string]: number;
    }
  }
  trans_agged: {
    country: Country;
    row_data: {
      [key: string]: number;
    }
  }
  official_agged: {
    country: Country;
    row_data: {
      [key: string]: number;
    }
  }
}

@Component({
  selector: 'app-grid-country-est-detail',
  templateUrl: './grid-country-est-detail.component.html',
  styleUrls: ['./grid-country-est-detail.component.scss']
})
export class GridCountryEstDetailComponent implements OnChanges {
  public defaultColDef: any = {suppressMovable: true}
  public columnDefs: any;
  public rowData: any;
  public country: Country = new Country()
  public modules: Module[] = [ClientSideRowModelModule];

  @Input() countryAggeds: CountryAllAggedWise = {} as CountryAllAggedWise
  public countryAgged: CountryAllAggedWise = {} as CountryAllAggedWise

  constructor() {
    this.defaultColDef = {
      resizable: true,
    };
  }


  ngOnChanges() {
    let dets: any = []
    let just_row_data
    this.country = this.countryAggeds.country
    forIn(omit(this.countryAggeds, 'country'), (x, key) => {
      just_row_data = omit(x.row_data, 'total')
      let name = ''
      if (key == 'tot_agged') {
        name = 'Total Fees'
      } else if (key == 'trans_agged') {
        name = 'Translation Fees'
      } else if (key == 'official_agged') {
        name = 'Official Fees'
      }
      dets.push({fee_type: name, ...x.row_data})
    })
    let tot_row = dets.find((x: any) => x.fee_type == 'Total Fees')
    let trans_row = dets.find((x: any) => x.fee_type == 'Translation Fees')
    let official_row = dets.find((x: any) => x.fee_type == 'Official Fees')
    // this.rowData = [omit(official_row, 'total'),
    //   omit(trans_row, 'total'), omit(tot_row, 'total')]
    this.rowData = [official_row, trans_row, tot_row]
    this.columnDefs = [
      {
        field: 'fee_type', headerName: this.country.long_name,
        pinned: true, lockPosition: true,
        valueGetter: (params: ValueGetterParams) => {
          return params.data.fee_type
        }
      },
      {
        field: 'total', headerName: 'Total',
        pinned: true, lockPosition: true,
        width: 100,
        valueFormatter: currencyFormatter,
        cellClass: 'second-col',
      }
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

