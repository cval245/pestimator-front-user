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
      public init_appl_pages_desc: number,
      public init_appl_pages_claims: number,
      public init_appl_pages_drawings: number,
      public pct_method: boolean,
      public pct_country: number | Country,
      public isa_country: number | Country,
      public pct_countries: any,
      public ep_method: boolean,
      public ep_countries: any,
      public paris_countries: any,
      public unique_display_no?: number,
      public id?: any,
    ){}
}
export class FamEstFormFull{
  constructor(
    public family_name: string,
    public family_no: string,
    public entity_size: EntitySize = new EntitySize(0, '', ''),
    public init_appl_filing_date: any,
    public init_appl_country: Country = new Country(0, '', '',
      false, false, false, '', '', [0], [0], [0]),
    public init_appl_type: ApplType = new ApplType(0, '', '', [0]),
    public init_appl_claims: number,
    public init_appl_drawings: number,
    public init_appl_indep_claims: number,
    public init_appl_pages_desc: number,
    public init_appl_pages_claims: number,
    public init_appl_pages_drawings: number,
    public pct_method: boolean,
    public pct_country: Country = new Country(0, '', '',
      false, false, false, '', '', [0], [0], [0]),
    public isa_country: Country = new Country(0, '', '',
      false, false, false, '', '', [0], [0], [0]),
    public pct_countries: any,
    public ep_method: boolean,
    public ep_countries: any,
    public paris_countries: any,
    public unique_display_no?: number,
    public id?: any,
  ){}
}
