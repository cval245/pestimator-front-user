export class CountryAll{
    constructor(
      public id: number,
      public country: string,
      public currency_name: string,
      public active_bool: boolean,
      public ep_bool: boolean,
      public pct_ro_bool: boolean,
      public pct_accept_bool: boolean,
      public color: string,
      public long_name: string,
      public available_appl_types: [number],
      public isa_countries: [number],
      public languages_set: [number]
    ) {
    }
}
