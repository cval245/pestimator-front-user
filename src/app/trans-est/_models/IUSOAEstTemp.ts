import {IBaseEstTemp, IBaseEstTempSubmit} from "./BaseEstTemp.model";

export interface IUSOAEstTemp extends IBaseEstTemp {
  oa_final_bool: boolean;
  oa_first_final_bool: boolean;
}

export interface IUSOAEstTempSubmit extends IBaseEstTempSubmit {
  oa_final_bool: boolean;
  oa_first_final_bool: boolean;
}
