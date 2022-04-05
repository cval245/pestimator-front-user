export class ArticleImagePosition {

  public id: number = 0
  public name: string = ''

  constructor(init?: Partial<ArticleImagePosition>) {
    Object.assign(this, init)
  }
}
