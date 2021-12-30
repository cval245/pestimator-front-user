import {ITransComplexTime} from "./TransComplexTime";

export interface IIssueTrans{
  id: number;
  date_diff: string;
  country: any;
  appl_type: any;
  trans_complex_time_condition: number | ITransComplexTime | null;
}
