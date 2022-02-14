import {Component} from '@angular/core';
import {IFilterAngularComp} from "@ag-grid-community/angular";
import {IDoesFilterPassParams, IFilterParams} from "@ag-grid-community/core";


@Component({
  selector: 'app-appltypefilter',
  templateUrl: './appltypefilter.component.html',
  styleUrls: ['./appltypefilter.component.scss']
})
export class AppltypefilterComponent implements IFilterAngularComp {

  // constructor() { }

  params!: IFilterParams;
  filterText = '';

  agInit(params: IFilterParams): void {
    this.params = params;
  }

  doesFilterPass(params: IDoesFilterPassParams) {
    // make sure each word passes separately, ie search for firstname, lastname
    let passed = true;
    const {api, colDef, column, columnApi, context} = this.params;
    const {node} = params;

    this.filterText
      .toLowerCase()
      .split(' ')
      .forEach((filterWord) => {
        const value = this.params.valueGetter({
          //@ts-ignore
          api,
          colDef,
          column,
          columnApi,
          context,
          data: node.data,
          getValue: (field: any) => node.data[field],
          node,
        });

        if (value.application_type.toString().toLowerCase().indexOf(filterWord) < 0) {
          passed = false;
        }
      });

    return passed;
  }

  isFilterActive(): boolean {
    return this.filterText != null && this.filterText !== '';
  }

  getModel() {
    if (!this.isFilterActive()) {
      return null;
    }

    return {value: this.filterText};
  }

  setModel(model: any) {
    this.filterText = model == null ? null : model.value;
  }

  onInputChanged() {
    this.params.filterChangedCallback();
  }

}
