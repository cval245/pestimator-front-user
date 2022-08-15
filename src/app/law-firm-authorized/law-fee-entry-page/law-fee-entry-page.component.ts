import {Component, OnDestroy, OnInit} from '@angular/core';
import {LawFirmFeeService} from "../../_services/law-firm-fee.service";
import {combineLatest, Subject} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";
import {LawFirmFee} from "../../_models/LawFirmFee.model";
import {LawFirmAuthorized} from "../../_models/law-firm-authorized";
import {LawFirmAuthorizedService} from "../../_services/law-firm-authorized.service";
import {CurrencyService} from "../../_services/currency.service";
import {Currency, currencyNameSort} from "../../_models/Currency.model";
import {LawFirmFeeTypeService} from "../../_services/law-firm-fee-type.service";
import {LawFirmFeeType} from "../../_models/LawFirmFeeType.model";

@Component({
  selector: 'app-law-fee-entry-page',
  templateUrl: './law-fee-entry-page.component.html',
  styleUrls: ['./law-fee-entry-page.component.scss']
})
export class LawFeeEntryPageComponent implements OnInit, OnDestroy {

  private destroy = new Subject<void>()
  public lawFirm = new LawFirmAuthorized();
  private lawFirmFees = new Array<LawFirmFee>();
  public currencies = new Array<Currency>();
  public aggedLawFirmFees = new Array<LawFirmFee>()
  private lawFirmFeeTypes = new Array<LawFirmFeeType>();
  initialCurrency = new Currency();

  constructor(
    private lawFirmFeeSer: LawFirmFeeService,
    private lawFirmSer: LawFirmAuthorizedService,
    private lawFirmFeeTypeSer: LawFirmFeeTypeService,
    private currencySer: CurrencyService,
  ) {
  }

  ngOnInit(): void {
    combineLatest([
      this.lawFirmSer.getAll(),
      this.currencySer.getAll(),
    ])
      .pipe(switchMap(([lawFirm, currencies]) => {
        this.currencies = currencyNameSort(currencies)
        this.lawFirm = lawFirm[0]

        return combineLatest([
          this.lawFirmFeeSer.getAll(),
          this.lawFirmFeeTypeSer.getWithQuery('Country=' + this.lawFirm.country)
        ])
      }))
      .pipe(takeUntil(this.destroy))
      .subscribe(([lawFirmFees, lawfirmFeeTypes]) => {
        this.lawFirmFeeTypes = lawfirmFeeTypes
        this.lawFirmFees = lawFirmFees.map(fee => {
          return {
            ...fee,
            fee_amount_currency: this.currencies.find(cur => cur.currency_name == fee.fee_amount_currency)!,
            fee_type: this.lawFirmFeeTypes.find(feeType => feeType.id === fee.fee_type)!,
            lawfirm: this.lawFirm
          }
        })
        const lawFirmFee = this.lawFirmFees.find(fee => fee.fee_amount_currency.id !== 0)
        if (lawFirmFee !== undefined) {
          this.initialCurrency = lawFirmFee.fee_amount_currency
        } else {
          this.initialCurrency = new Currency()
        }

        this.aggedLawFirmFees = this.lawFirmFeeTypes.map(feeType => {
          // find existing fee types
          const existingFee = this.lawFirmFees.find(fee => fee.fee_type.id === feeType.id)
          if (existingFee !== undefined) {
            return existingFee
          }
          return new LawFirmFee({
            'fee_type': feeType,
            'lawfirm': this.lawFirm,
            fee_amount_currency: this.initialCurrency
          })
        })
      })
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }

  onSubmit(lawFirmFee: LawFirmFee) {
    this.initialCurrency = lawFirmFee.fee_amount_currency
    const newLawFirmFee = {
      ...lawFirmFee,
      fee_amount_currency: lawFirmFee.fee_amount_currency.currency_name,
      lawfirm: lawFirmFee.id,
      fee_type: lawFirmFee.fee_type.id
    }
    if (lawFirmFee.id === 0) {
      this.lawFirmFeeSer.add(newLawFirmFee).subscribe()
    } else {
      this.lawFirmFeeSer.update(newLawFirmFee).subscribe()
    }
  }
}
