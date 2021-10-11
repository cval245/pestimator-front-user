export class Country{
    constructor(
      public id: number,
      public country: string,
      public currency_name: string,
      public ep_bool: boolean,
      public pct_analysis_bool: boolean,
      public color: string,
      public long_name: string,
      public available_appl_types: [number],
      public isa_countries: [number],
      public col?: number,
    ) {
    }
}
