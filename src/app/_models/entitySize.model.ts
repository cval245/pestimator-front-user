export class EntitySize {
  public id: number = 0
  public entity_size: string = 'default'
  public description: string = 'default'
  public default_bool: boolean = false
  public country: number = 0

  constructor(init?: Partial<EntitySize>) {
    Object.assign(this, init)
  }
}
