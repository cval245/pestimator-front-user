import {LawFirm} from "./law-firm.model";
import {LawFirmFeeType} from "./LawFirmFeeType.model";

export class LawFirmFee {
  public id: number = 0;
  public lawfirm: number = 0;
  public fee_type: number = 0;
  public fee_amount: number = 0;

  constructor(init?: Partial<LawFirmFee>) {
    Object.assign(this, init)
  }
}

export class LawFirmFeeDto {
  public id: number = 0;
  public lawfirm: LawFirm = new LawFirm();
  public fee_type: LawFirmFeeType = new LawFirmFeeType();
  public fee_amount: number = 0;

  constructor(init?: Partial<LawFirmFee>) {
    Object.assign(this, init)
  }
}
