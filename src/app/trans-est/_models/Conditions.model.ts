import {IComplexConditions} from "./ComplexConditions.model";
import {IComplexTimeConditions} from "./IComplexTimeConditions";

export interface IConditions {
  id: number;
  condition_claims_min?: number;
  condition_claims_max?: number;
  condition_indep_claims_min?: number;
  condition_indep_claims_max?: number;
  condition_pages_min?: number;
  condition_pages_max?: number;
  condition_drawings_min?: number;
  condition_drawings_max?: number;
  condition_entity_size?: any;
  condition_complex?: number | IComplexConditions;
  condition_time_complex?: number | IComplexTimeConditions;
  condition_annual_prosecution_fee?: boolean;
  prior_pct?: boolean;
  prior_pct_same_country?: boolean;
  prev_appl_date_excl_intermediary_time?: boolean;
}
