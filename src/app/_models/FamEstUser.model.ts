import {UserAll} from "./UserAll.model";

export class FamEstUser{
  public id: number = 0
  public date_created: Date = new Date()
  public law_firm_cost: number = 0
  public official_cost: number = 0
  public translation_cost: number = 0
  public total_cost: number = 0
  public famestformdata: number = 0
  public famestformdata__unique_display_no: number = 0
  public user: number | UserAll = 0
  public family_name: string = ''
  public family_no: string = ''

  constructor(init?: Partial<UserAll>) {
    Object.assign(this, init)
  }
}
