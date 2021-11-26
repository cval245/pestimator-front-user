import {ITransComplexTime} from "./TransComplexTime";

export interface IOATrans{
		id: number;
		date_diff: string;
		country: any;
    complex_time_conditions?: number | ITransComplexTime;
}
