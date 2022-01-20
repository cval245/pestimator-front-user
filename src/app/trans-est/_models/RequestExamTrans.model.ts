import {ITransComplexTime} from "./TransComplexTime";

export interface IRequestExamTrans{
  id: number;
  date_diff: string;
  country: any;
  appl_type: any;
  prev_appl_type: any;
  trans_complex_time_condition: number | ITransComplexTime | null;
}
