export class FamEstFree {
  public date_created: string = ''
  public id: number = 0
  public law_firm_cost: number = 0
  public official_cost: number = 0
  public translation_cost: number = 0
  public total_cost: number = 0
  public famestformdata: number = 0
  public famestformdata_udn: number = 0
  public country: any = 0
  public excel_url = ''
  public pdf_url = ''

  constructor(init?: Partial<FamEstFree>) {
    Object.assign(this, init)
  }
}
