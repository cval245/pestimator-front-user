import {EntitySize} from "../../characteristics/_models/entitySize.model";
import {Country} from "../../characteristics/_models/Country.model";
import {ApplType} from "../../characteristics/_models/applType.model";

export class FamEstForm{
    constructor(
      public family_name: string,
      public family_no: string,
      public entity_size: number | EntitySize,
      public init_appl_filing_date: any,
      public init_appl_country: number | Country,
      public init_appl_type: number | ApplType,
      public init_appl_claims: number,
      public init_appl_drawings: number,
      public init_appl_indep_claims: number,
      public init_appl_pages: number,
      public method: boolean,
      public meth_country: number | Country,
      public countries: any,
      public ep_method: boolean,
      public id?: any,
    ){}
}
export class FamEstFormFull{
  constructor(
    public family_name: string,
    public family_no: string,
    public entity_size: EntitySize = new EntitySize(0, ''),
    public init_appl_filing_date: any,
    public init_appl_country: Country = new Country(0, '','',
      false, false,'',''),
    public init_appl_type: ApplType = new ApplType(0, '', ''),
    public init_appl_claims: number,
    public init_appl_drawings: number,
    public init_appl_indep_claims: number,
    public init_appl_pages: number,
    public method: boolean,
    public meth_country: Country = new Country(0, '','',
      false, false,'',''),
    public countries: any,
    public ep_method: boolean,
    public id?: any,
  ){}
}
