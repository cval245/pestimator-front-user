export class LawFirm {
  public id: number = 0
  public name: string = ''
  public slug: string = ''
  public user: any = 0
  public long_description: string = ''
  public website: string = ''
  public email: string = ''
  public phone: string = ''
  public country: any = 0
  public image_location: any = 'empty-image'

  constructor(init?: Partial<LawFirm>) {
    Object.assign(this, init)
  }
}
