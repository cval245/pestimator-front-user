import {Component} from '@angular/core';
import {ICellRendererAngularComp} from "@ag-grid-community/angular";
import {ICellRendererParams} from "@ag-grid-community/core";
import {Router} from "@angular/router";

// import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-btn-cell-renderer',
  templateUrl: './btn-cell-renderer.component.html',
  styleUrls: ['./btn-cell-renderer.component.scss']
})
export class BtnCellRendererComponent implements ICellRendererAngularComp{
  private params: ICellRendererParams = {} as ICellRendererParams;
  constructor(private router: Router) { }

  agInit(params: ICellRendererParams) {
    this.params = params
  }

  refresh(params: ICellRendererParams): boolean{
    this.params = params
    return true
  }

  btnClickedHandler(){
    this.router.navigate(['admin/user-detail', this.params.data.id])
  }


}
