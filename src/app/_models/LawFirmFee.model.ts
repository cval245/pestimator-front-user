import {LawFirm} from "./law-firm.model";
import {LawFirmFeeType} from "./LawFirmFeeType.model";
import {Currency} from "./Currency.model";

export class LawFirmFeeDto {
  public id: number = 0;
  public lawfirm: number = 0;
  public fee_type: number = 0;
  public fee_amount: number = 0;
  public fee_amount_currency: string = '';

  constructor(init?: Partial<LawFirmFeeDto>) {
    Object.assign(this, init)
  }
}

export class LawFirmFee {
  public id: number = 0;
  public lawfirm: LawFirm = new LawFirm();
  public fee_type: LawFirmFeeType = new LawFirmFeeType();
  public fee_amount: number = 0;
  public fee_amount_currency: Currency = new Currency();

  constructor(init?: Partial<LawFirmFee>) {
    Object.assign(this, init)
  }
}
