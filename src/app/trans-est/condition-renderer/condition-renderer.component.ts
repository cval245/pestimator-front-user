import {Component} from '@angular/core';
import {ICellRendererAngularComp} from "@ag-grid-community/angular";
import {forIn} from "lodash";
import {MatDialog} from "@angular/material/dialog";
import {ConditionsFormComponent} from "../conditions-form/conditions-form.component";
import {Country} from "../../_models/Country.model";
import {ICellRendererParams} from "@ag-grid-community/core";
import {ApplType} from "../../_models/applType.model";

@Component({
  selector: 'app-condition-renderer',
  templateUrl: './condition-renderer.component.html',
  styleUrls: ['./condition-renderer.component.scss']
})
export class ConditionRendererComponent implements ICellRendererAngularComp {
  //@ts-ignore
  private params: ICellRendererParams;
  public conditions: any
  public adjustConditions: any = []
  public country: Country = new Country();
  public applType: ApplType = new ApplType();

  constructor(public dialog: MatDialog) {
  }


  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.createChips(this.params)
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    this.createChips(this.params)
    return true;
  }

  createChips(params: ICellRendererParams) {
    this.country = params.data.country
    this.applType = params.data.appl_type
    this.conditions = params.data.conditions
    this.adjustConditions = []
    forIn(this.conditions, (value, key) => {
      if (value !== undefined && value !== null) {
        if (value
          || (
            key == 'prior_pct'
            || key == 'prior_pct_same_country'
            || key == 'prior_appl_exists')
        ) {
          if (key !== 'id') {
            let displayValue = value
            if (key === 'condition_entity_size') {
              displayValue = value.entity_size
            } else if (key === 'condition_complex') {
              displayValue = value.name
            } else if (key === 'condition_time_complex') {
              displayValue = value.name
            } else if (key === 'doc_format') {
              displayValue = value.name
            } else if (key === 'language') {
              displayValue = value.name
            }
            this.adjustConditions.push([key, value, displayValue])
          }
        }
      }
    })
  }

  remove(c: any) {
    this.adjustConditions
  }

  editConditions() {
    const dialogRef = this.dialog.open(ConditionsFormComponent, {
      width: '1200px',
      data: {conditions: this.conditions, country: this.country, appl_type: this.applType}
    })
    dialogRef.afterClosed().subscribe(() => {
    })
  }
}
