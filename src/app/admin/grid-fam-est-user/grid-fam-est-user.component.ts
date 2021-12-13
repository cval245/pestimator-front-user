import {Component, Input, OnChanges} from '@angular/core';
import {FamEstUser} from "../_models/FamEstUser.model";
import {ValueFormatterParams} from "@ag-grid-community/core";
import {BtnFamEstCellRendererComponent} from "../btn-fam-est-cell-renderer/btn-fam-est-cell-renderer.component";

@Component({
  selector: 'app-grid-fam-est-user',
  templateUrl: './grid-fam-est-user.component.html',
  styleUrls: ['./grid-fam-est-user.component.scss']
})
export class GridFamEstUserComponent implements OnChanges{

  @Input() famEstUsers: FamEstUser[] = [new FamEstUser()]
  public defaultColDef: any = {suppressMovable: true, resizable: true,
    width: 150,
  }
  public columnDefs: any;
  public frameworkComponents: BtnFamEstCellRendererComponent =  {} as BtnFamEstCellRendererComponent;
  public paginationPageSize: number = 10;
  constructor() { }

  ngOnChanges() {
    console.log('ths', this.famEstUsers )
    this.columnDefs = [
      {
        field: 'button',
        cellRenderer: 'btnFamEstCellRenderer',
        width: 100,
      },
      {
        field: 'family_no', headerName: 'Family No',
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        filterParams: {
          buttons: ['reset'],
          caseSensitive: true,
          defaultOption: 'startsWith'
        }
      },
      {
        field: 'family_name', headerName: 'Family Name',
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        filterParams: {
          buttons: ['reset'],
          caseSensitive: true,
          defaultOption: 'startsWith'
        }
      },
      {
        field: 'famestformdata__unique_display_no', headerName: 'FamForm UDN',
        filter: 'agNumberColumnFilter',
        floatingFilter: true,
        filterParams: {
          buttons: ['reset'],
        }
      },
      {
        field: 'date_created', headerName:'Date Created',
        valueFormatter: dateFormatter,
        width: 150,
      },
      {
        field: 'law_firm_cost', headerName:'Law Firm Cost',
        valueFormatter: currencyFormatter,
      },
      {
        field: 'official_cost', headerName:'Official Cost',
        valueFormatter: currencyFormatter,
      },
      {
        field: 'translation_cost', headerName:'Translation Cost',
        valueFormatter: currencyFormatter,
      },
      {
        field: 'total_cost', headerName:'Total Cost',
        valueFormatter: currencyFormatter,
      },
      {
        field: 'famestformdata', headerName: 'FamForm ID'
      },
    ];
    this.frameworkComponents = {
      //@ts-ignore
      btnFamEstCellRenderer: BtnFamEstCellRendererComponent
    }
  }
}

function dateFormatter(params: ValueFormatterParams){
  return params.value.toDateString();
}

function currencyFormatter(params: ValueFormatterParams) {
  return '$' + formatNumber(params.value);
}



function formatNumber(number: number) {
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

