export class CountryAll{
  public id: number = 0
  public country: string = 'default'
  public currency_name: string = 'default'
  public active_bool: boolean = false
  public ep_bool: boolean = false
  public pct_ro_bool: boolean = false
  public pct_accept_bool: boolean = false
  public color: string = ''
  public long_name: string = 'default'
  public available_appl_types: [number] = [0]
  public isa_countries: [number] = [0]
  public languages_set: [number] = [0]
  public ep_validation_translation_required: number = 0
  public entity_size_available: boolean = false
  public available_entity_sizes: [number] = [0]
  public available_doc_formats: [number] = [0]

  constructor(init?:Partial<CountryAll>){
    Object.assign(this, init)
  }
}
