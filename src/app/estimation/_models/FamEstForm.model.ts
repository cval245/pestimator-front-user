export class FamEstForm{
    constructor(
      public id?: any,
      public family_name?: string,
      public family_no?: string,
      public entity_size?: number,
      public init_appl_filing_date?: any,
      public init_appl_country?: number,
      public init_appl_type?: number,
      public init_appl_claims?: number,
      public init_appl_drawings?: number,
      public init_appl_indep_claims?: number,
      public init_appl_pages?: number,
      public method?: boolean,
      public meth_country?: number,
      public countries?: any,
      public ep_method?: boolean,
    ){}
}
