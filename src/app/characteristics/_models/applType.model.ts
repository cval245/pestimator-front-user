export class ApplType{
    constructor(
      public id: number,
      public application_type: string,
      public long_name: string,
      public country_set: [number],
    ) {}
}
