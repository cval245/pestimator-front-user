export class OAType{
  public oa_bool?: boolean = false
  public name?: string = 'default'
  constructor(init?:Partial<OAType>){
    Object.assign(this, init)
  }
}
