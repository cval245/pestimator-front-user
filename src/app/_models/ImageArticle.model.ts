export class ImageArticle {
  public id: number = 0
  // public image_position: ArticleImagePosition = new ArticleImagePosition()
  public image_location: string = ''
  public article: number = 0

  constructor(init?: Partial<ImageArticle>) {
    Object.assign(this, init)
  }
}

export class ImageArticleSubmit {
  public id: number = 0
  // public image_position: number = 0
  public image_location: string = ''
  public article: number = 0

  constructor(init?: Partial<ImageArticleSubmit>) {
    Object.assign(this, init)
  }
}
