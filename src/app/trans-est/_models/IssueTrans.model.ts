import {ITransComplexTime} from "./TransComplexTime";

export interface IIssueTrans{
		id: number;
		date_diff: string;
		country: any;
    complex_time_conditions?: number | ITransComplexTime;
}
