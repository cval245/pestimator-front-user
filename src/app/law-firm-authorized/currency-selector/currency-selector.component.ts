import {Component} from '@angular/core';
import {ICellEditorAngularComp} from "@ag-grid-community/angular";
import {FormControl} from "@angular/forms";
import {Currency} from 'src/app/_models/Currency.model';


@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss']
})
export class CurrencySelectorComponent implements ICellEditorAngularComp {

  currencyCtrl = new FormControl()
  currencies = new Array<Currency>()
  currency = new Currency()

  constructor() {
  }

  ngOnInit(): void {
  }

  agInit(params: any) {
    this.currencies = params.values
    console.log(params)
    if (params.initial_currency.id === 0) {
      this.currency = params.initial_currency
    } else {
      this.currency = params.value
    }
    this.currencyCtrl.setValue(this.currency)
  }

  getValue(): Currency {
    return this.currencyCtrl.value
  }

  compareCurrency(c_one: Currency, c_two: Currency) {
    return c_one.id === c_two.id;
  }
}
