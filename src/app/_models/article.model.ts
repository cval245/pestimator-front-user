export class Article{
  public id: number = 0
  public title: string = ''
  public slug: string = ''
  public image_location: string=''
  public date_created: Date = new Date()
  public content?: string = ''
  public content_short?: string = ''

  constructor(init?:Partial<Article>){
    Object.assign(this, init)
  }
}
