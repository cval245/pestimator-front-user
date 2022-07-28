import {IFeeCategory} from "./FeeCategory.model";
import {IDetailedFeeCategory} from "./DetailedFeeCategory.model";
import {ILawFirmEstTemp} from "./LawFirmEstTemp.model";
import {ApplType} from "../../_models/applType.model";
import {Country} from "../../_models/Country.model";
import {IConditions} from "./Conditions.model";

export interface IBaseEstTemp {
  id: number;
  official_cost: number,
  official_cost_currency: string,
  date_diff: string;
  country: Country;
  conditions: IConditions;
  appl_type: ApplType;
  law_firm_template: ILawFirmEstTemp;
  description: string;
  fee_code: string;
  isa_country_fee_only: boolean;
  fee_category: IFeeCategory;
  detailed_fee_category: IDetailedFeeCategory;
  date_enabled: Date;
  date_disabled: Date;
}

export interface IBaseEstTempSubmit {
  id: number,
  official_cost: number,
  official_cost_currency: string,
  date_diff: string;
  country: number;
  appl_type: number;
  conditions: number;
  law_firm_template: number;
  description: string;
  fee_code: string;
  isa_country_fee_only: boolean;
  fee_category: number;
  detailed_fee_category: number;
  date_enabled: string;
  date_disabled: string;
}


export function convertIBaseEst<Tbase extends IBaseEstTempSubmit>(base: Tbase,
                                                                  countries: Country[],
                                                                  applTypes: ApplType[],
                                                                  conditions: IConditions[],
                                                                  lawFirmEstTemps: ILawFirmEstTemp[],
                                                                  feeCats: IFeeCategory[],
                                                                  detailedFeeCats: IDetailedFeeCategory[],
) {
  return {
    ...base,
    country: countries.find(x => x.id == base.country),
    appl_type: applTypes.find(x => x.id == base.appl_type),
    conditions: conditions.find(x => x.id == base.conditions),
    law_firm_template: lawFirmEstTemps.find(x => x.id == base.law_firm_template),
    fee_category: feeCats.find(x => x.id == base.fee_category),
    detailed_fee_category: detailedFeeCats.find(x => x.id == base.detailed_fee_category),
    date_enabled: new Date(base.date_enabled),
    date_disabled: new Date(base.date_disabled)
  }
}

export function convertIBaseEstToSubmit<T extends IBaseEstTemp>(base: T) {
  console.log(base)
  return {
    ...base,
    country: base.country.id,
    appl_type: base.appl_type.id,
    conditions: base.conditions.id,
    law_firm_template: base.law_firm_template.id,
    fee_category: base.fee_category.id,
    detailed_fee_category: base.detailed_fee_category.id,
    date_enabled: convertToDateString(base.date_enabled),
    date_disabled: convertToDateString(base.date_disabled)
  }
}

function convertToDateString(date: Date): string {
  let dateString = date.toISOString()
  let timeIndex = dateString.indexOf('T')
  return dateString.slice(0, timeIndex)
}
