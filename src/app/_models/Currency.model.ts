export class Currency {
  public id: number = 0
  public currency_name: string = 'default'
  public currency_full_name: string = 'default'

  constructor(init?: Partial<Currency>) {
    Object.assign(this, init)
  }
}


export function currencyNameSort(currencies: Currency[]): Currency[] {
  return currencies.sort((a, b) => {
    let objA = a.currency_name.toUpperCase()
    let objB = b.currency_name.toUpperCase()
    if (objA < objB) {
      return -1;
    }
    if (objA > objB) {
      return 1;
    }
    return 0;
  })
}
