export class ApplType{
  public id: number = 0
  public application_type: string = ''
  public long_name: string = ''
  public country_set: [number] = [0]

    constructor(init?:Partial<ApplType>){
      Object.assign(this, init)
    }
}
