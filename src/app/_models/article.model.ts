export class Article{
  public id: number = 0
  public title: string = ''
  public slug: string = ''
  public image_location: any = ''
  public date_created: Date = new Date()
  public visible: boolean = false
  public abstract: string = ''
  public content?: string = ''

  constructor(init?:Partial<Article>){
    Object.assign(this, init)
  }
}
