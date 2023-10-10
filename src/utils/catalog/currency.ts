import {CATALOG_CONFIG} from "../../config/catalog";

interface IFormatPriceProps {
    price: number,
    currencyCode: string,
}
export const formatPrice = ({price, currencyCode}: IFormatPriceProps) => {
    const currency = CATALOG_CONFIG.currencies.filter(cur => cur.code = currencyCode)[0]

    const result = [price.toFixed(currency.digitsAfterPricePoint)]
    if(currency.currencyPosition === 'after'){
        result.push(currency.symbol)
    }else if(currency.currencyPosition === 'before'){
        result.unshift(currency.symbol)
    }
    return result.join(currency.currencyDelimiter)
}