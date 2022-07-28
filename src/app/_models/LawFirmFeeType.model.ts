import {IDetailedFeeCategory} from "../trans-est/_models/DetailedFeeCategory.model";

export class LawFirmFeeType {
  public id: number = 0;
  public lawfirm: number = 0;
  public fee_type: number = 0;
  public fee_amount: number = 0;

  constructor(init?: Partial<LawFirmFeeType>) {
    Object.assign(this, init)
  }
}


export class LawFirmFeeTypeDto {
  public id: number = 0;
  public fee_name: string = '';
  public fee_description: string = '';
  public detailed_fee_categories: IDetailedFeeCategory[] = new Array<IDetailedFeeCategory>();

  constructor(init?: Partial<LawFirmFeeType>) {
    Object.assign(this, init)
  }
}
