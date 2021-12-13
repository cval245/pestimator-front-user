export class FamEstDetTot{
  public id: number = 0
  public year: number = 0
  public num_indep_claims: number = 0
  public official_cost_sum: number = 0
  public translation_cost_sum: number = 0
  public law_firm_cost_sum: number = 0
  public total_cost_sum: number = 0

  constructor(init?: Partial<FamEstDetTot>) {
    Object.assign(this, init)
  }
}
