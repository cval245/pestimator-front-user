export class Family {
  public famestformdata: number = 0
  public fam_est_form_data_udn: number = 0
  public id: number = 0
  public family_name: string = ''
  public family_no: string = ''
  public unique_display_no: number = 0

  constructor(init?: Partial<Family>) {
    Object.assign(this, init)
  }
}
