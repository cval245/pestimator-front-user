export class Currency{
  public id: number = 0
  public currency_name: string = 'default'
  public currency_full_name: string = 'default'
  constructor(init?:Partial<Currency>){
    Object.assign(this, init)
  }
}
