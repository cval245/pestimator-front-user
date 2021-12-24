import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {UserAll} from "../../_models/UserAll.model";
import {BtnCellRendererComponent} from "../btn-cell-renderer/btn-cell-renderer.component";
// import {ValueFormatterParams} from "@ag-grid-community/core";
import {Module, ValueFormatterParams} from "@ag-grid-community/core";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";

@Component({
  selector: 'app-grid-user-all',
  templateUrl: './grid-user-all.component.html',
  styleUrls: ['./grid-user-all.component.scss']
})
export class GridUserAllComponent implements OnInit, OnChanges{
  @Input() userAlls: UserAll[] = [new UserAll()]
  public defaultColDef: any = {suppressMovable: true}
  public columnDefs: any;
  public frameworkComponents: BtnCellRendererComponent = {} as BtnCellRendererComponent;
  public modules: Module[] = [ClientSideRowModelModule];
  constructor() {
  }

  ngOnInit(): void {
    this.defaultColDef = {
      resizable: true,
    };
  }

  ngOnChanges() {

    this.columnDefs = [
      {
        field: 'button',
        width: 100,
        cellRenderer: 'btnCellRenderer',
        cellRendererParams:{
          clicked: function(field: any){
            alert(`${field}was clicked`)
          }
        }
      },
      {
        field: 'username', headerName: 'Username',
        pinned: true, lockPosition: true,
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        filterParams: {
          buttons: ['reset'],
          caseSensitive: true,
          defaultOption: 'startsWith'
        }
      },
      {
        field: 'email', headerName: 'Email',
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        filterParams: {
          buttons: ['reset'],
          caseSensitive: true,
          defaultOption: 'startsWith'
        }
      },
      {
        field: 'is_staff', headerName: 'Is Staff',
        width: 100,
      },
      {
        field: 'is_active', headerName: 'Is Active',
        width: 100,
      },
      {
        field: 'date_joined', headerName: 'Date Joined',
        filter: 'agDateColumnFilter',
        width: 150,
        valueFormatter: dateFormatter,
        filterParams: {
          buttons: ['reset'],
          defaultOption: 'inRange'
        },
        // floatingFilter: true,
      },
      {
        field: 'is_superuser', headerName: 'Is Superuser',
        width: 150,
      },
      {
        field: 'last_login', headerName: 'Last Login',
        width: 150,
      },
      {
        field: 'admin_data', headerName: 'Admin Data',
        width: 150,
      },
      {
        field: 'terms_agreed', headerName: 'Terms Agreed',
        width: 150,
      },
    ];
    this.frameworkComponents = {
      //@ts-ignore
      btnCellRenderer: BtnCellRendererComponent
      // conditionRenderer: new ConditionRendererComponent()
    }
  }
}
function dateFormatter(params: ValueFormatterParams){
  return params.value.toDateString();
}
