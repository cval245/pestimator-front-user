import {EntitySize} from "./entitySize.model";
import {IDocFormat} from "./DocFormat.model";

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
  public languages_set: [number] = [0]
  public ep_validation_translation_required: number = 0
  public entity_size_available: boolean = false
  public available_entity_sizes: [number] = [0]
  public available_doc_formats: [number] = [0]
  public col?: number = 0

  constructor(init?:Partial<Country>){
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
  public languages_set: [number] = [0]
  public ep_validation_translation_required: number = 0
  public entity_size_available: boolean = false
  public available_entity_sizes: EntitySize[] = [new EntitySize()]
  public available_doc_formats: IDocFormat[] = new Array<IDocFormat>()
  public col?: number = 0

  constructor(init?:Partial<Country>){
    Object.assign(this, init)
  }
}
