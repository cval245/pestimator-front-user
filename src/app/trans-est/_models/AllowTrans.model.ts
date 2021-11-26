import {ITransComplexTime} from "./TransComplexTime";

export interface IAllowTrans{
		id: number;
		date_diff: string;
		country: any;
    complex_time_conditions?: number | ITransComplexTime;
}
