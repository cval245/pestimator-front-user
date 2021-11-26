import {ITransComplexTime} from "./TransComplexTime";

export interface ICustomFilTrans{
		id?: number;
		date_diff: string;
		country: any;
		appl_type: any;
		prev_appl_type: any;
    complex_time_conditions?: number | ITransComplexTime;
}
