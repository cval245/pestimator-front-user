export class ApplDetail{
  public num_indep_claims: number = 0
  public num_claims: number = 0
  public num_claims_multiple_dependent: number = 0
  public num_drawings: number = 0
  public num_pages_description: number = 0
  public num_pages_claims: number = 0
  public num_pages_drawings: number = 0
  public language: any = 0
  public entity_size?: any = 0
  public application?: any = 0
  public id?: number = 0

  constructor(init?:Partial<ApplDetail>){
    Object.assign(this, init)
  }
}
