
export class UserAll {
  public id: number = 0
  public email: string = ''
  public username: string = ''
  public is_staff: boolean = false
  public is_active: boolean = false
  public date_joined: Date = new Date()
  public is_superuser: boolean = false
  public last_login: Date = new Date()
  public admin_data: boolean = false
  public terms_agreed: boolean = false

  constructor(init?: Partial<UserAll>) {
    Object.assign(this, init)
  }

}
