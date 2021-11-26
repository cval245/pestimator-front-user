import {CountryAll} from "../../characteristics/_models/CountryAll.model";
import {ApplType} from "../../characteristics/_models/applType.model";

export interface ITransFilReq{
  country: number
  required_transforms: {appl_type: number, prev_appl_type: number | null}[]
}
export interface ITransFilReqFull{
  country: CountryAll
  required_transforms: {appl_type: ApplType,  prev_appl_type: ApplType | null}[]
}
