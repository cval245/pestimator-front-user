export class CustomApplOptions{
  public request_examination_early_bool: boolean = false
  constructor(init?:Partial<CustomApplOptions>){
    Object.assign(this, init)
  }
}

