import {IComplexConditions} from "./ComplexConditions.model";
import {IComplexTimeConditions} from "./IComplexTimeConditions";
import {IDocFormat} from "../../characteristics/_models/DocFormat.model";

export interface IConditions {
  id: number;
  condition_claims_min?: number;
  condition_claims_max?: number;
  condition_indep_claims_min?: number;
  condition_indep_claims_max?: number;
  condition_claims_multiple_dependent_min?: number;
  condition_claims_multiple_dependent_max?: number;
  condition_pages_total_min?: number;
  condition_pages_total_max?: number;
  condition_pages_desc_min?: number;
  condition_pages_desc_max?: number;
  condition_pages_claims_min?: number;
  condition_pages_claims_max?: number;
  condition_pages_drawings_min?: number;
  condition_pages_drawings_max?: number;
  condition_drawings_min?: number;
  condition_drawings_max?: number;
  condition_entity_size?: any;
  condition_complex?: number | IComplexConditions;
  condition_time_complex?: number | IComplexTimeConditions;
  condition_annual_prosecution_fee?: boolean;
  condition_annual_prosecution_fee_until_grant?: boolean;
  condition_renewal_fee_from_filing_after_grant?: boolean;
  prior_pct?: boolean;
  prior_pct_same_country?: boolean;
  prev_appl_date_excl_intermediary_time?: boolean;
  prior_appl_exists?: boolean
  doc_format?: number | IDocFormat;
}
