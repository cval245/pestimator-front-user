import {Component} from '@angular/core';
import {IDoesFilterPassParams, IFilterParams} from "@ag-grid-community/core";
import {IFilterAngularComp} from "@ag-grid-community/angular";

@Component({
  selector: 'app-detailed-fee-category-filter',
  templateUrl: './detailed-fee-category-filter.component.html',
  styleUrls: ['./detailed-fee-category-filter.component.scss']
})
export class DetailedFeeCategoryFilterComponent implements IFilterAngularComp {

  constructor() {
  }

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

        if (value.name.toString().toLowerCase().indexOf(filterWord) < 0) {
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
