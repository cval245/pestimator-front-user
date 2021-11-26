export class EntitySize{
        public id: number = 0
        public entity_size: string = 'default'
        public description: string = 'default'

  constructor(init?:Partial<EntitySize>){
    Object.assign(this, init)
  }
}
