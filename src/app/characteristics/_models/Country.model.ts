export class Country{
    constructor(
      public id: number,
      public country: string,
      public currency_name: string,
      public ep_bool: boolean,
      public pct_analysis_bool: boolean,
      public color: string,
      public long_name: string,
      public col?: number
    ){}
}
