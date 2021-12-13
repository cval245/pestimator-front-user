
export class UserProfileAll {
  public id: number = 0
  public company_name: string = ''
  public address: string = ''
  public city: string = ''
  public state: string = ''
  public zip_code: string = ''
  public estimates_remaining: number = 1

  constructor(init?: Partial<UserProfileAll>) {
    Object.assign(this, init)
  }

}
