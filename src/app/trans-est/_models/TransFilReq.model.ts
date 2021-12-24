import {CountryAll} from "../../_models/CountryAll.model";
import {ApplType} from "../../_models/applType.model";

export interface ITransFilReq{
  country: number
  required_transforms: {appl_type: number, prev_appl_type: number | null}[]
}
export interface ITransFilReqFull{
  country: CountryAll
  required_transforms: {appl_type: ApplType,  prev_appl_type: ApplType | null}[]
}
