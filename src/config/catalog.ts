interface ICatalogConfig {
    currencies: ICurrency[]
}

interface ICurrency {
    code: string
    symbol: string
    currencyPosition: 'before' | 'after' | false
    currencyDelimiter: string
    digitsAfterPricePoint: number
}

export const CATALOG_CONFIG: ICatalogConfig = {
    currencies: [
        {
            code: 'RUB',
            symbol: '₽',
            currencyPosition: 'after',
            currencyDelimiter: ' ',
            digitsAfterPricePoint: 0,
        },
        {
            code: 'USD',
            symbol: '$',
            currencyPosition: 'before',
            currencyDelimiter: ' ',
            digitsAfterPricePoint: 0,
        },
    ]
}