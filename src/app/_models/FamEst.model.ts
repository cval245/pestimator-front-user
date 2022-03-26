export class FamEst{
  public date_created: string = ''
  public id?: number = 0
  public law_firm_cost?: number = 0
  public official_cost?: number = 0
  public translation_cost?: number = 0
  public total_cost?: number = 0
  public famestformdata?: number = 0

  constructor(init?: Partial<FamEst>) {
    Object.assign(this, init)
  }
}
