export class Country{
  public id: number = 0
  public country: string = 'default'
  public currency_name: string = 'default'
  public ep_bool: boolean = false
  public pct_ro_bool: boolean = false
  public pct_accept_bool: boolean = false
  public color: string = ''
  public long_name: string = 'default'
  public available_appl_types: [number] = [0]
  public isa_countries: [number] = [0]
  // public available_languages: [number] = [0]
  public available_languages: {
    country: number,
    appl_type: number,
    language: number,
    default: boolean
  }[] = new Array<{ country: 0, appl_type: 0, language: 0, default: false }>()
  public ep_validation_translation_required: number = 0
  // public entity_size_available: boolean = false
  // public available_entity_sizes: [number] = [0]
  // public available_doc_formats: [number] = [0]
  public available_doc_formats: {
    country: number,
    appl_type: number,
    doc_format: number,
    default: boolean
  }[] = new Array<{ country: 0, appl_type: 0, doc_format: 0, default: false }>()
  public col?: number = 0

  constructor(init?: Partial<Country>) {
    Object.assign(this, init)
  }
}

export class CountryDetailsAdded{
  public id: number = 0
  public country: string = 'default'
  public currency_name: string = 'default'
  public ep_bool: boolean = false
  public pct_ro_bool: boolean = false
  public pct_accept_bool: boolean = false
  public color: string = ''
  public long_name: string = 'default'
  public available_appl_types: [number] = [0]
  public isa_countries: [number] = [0]
  public available_languages: {
    country: number,
    appl_type: number,
    language: number,
    default: boolean
  }[] = new Array<{ country: 0, appl_type: 0, language: 0, default: false }>()
  public ep_validation_translation_required: number = 0
  // public entity_size_available: boolean = false
  // public available_entity_sizes: EntitySize[] = [new EntitySize()]
  public col?: number = 0
  public available_doc_formats: {
    country: number,
    appl_type: number,
    doc_format: number,
    default: boolean
  }[] = new Array<{ country: 0, appl_type: 0, doc_format: 0, default: false }>()

  constructor(init?: Partial<Country>) {
    Object.assign(this, init)
  }
}
