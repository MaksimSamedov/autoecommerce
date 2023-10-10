export interface Product {
    id: number,
    name: string,
    image: string,
    price: number,
    currency: string,
    relevance: number,
    description: string|undefined,
}

const prods: Product[] = []

for(let i = 0; i < 100; i++){

    prods.push({
        id: i,
        name: "Test product " + i,//Math.ceil(Math.random() * 10000),
        image: randomImg(),
        price: Math.round(Math.random() * 1000),
        currency: "RUB",
        relevance: Math.random() * 10000,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nunc sit amet consequat risus, sit amet consequat urna.
            Sed sit amet pharetra ex, vel faucibus eros. Mauris diam mi, ultrices ut tincidunt a, pellentesque sed diam.
            Fusce iaculis interdum ligula, vitae accumsan lacus venenatis et.
            Curabitur tempor fermentum odio sed sollicitudin.
            Pellentesque molestie nulla at lectus porta, a fringilla tellus mattis.
            Vestibulum at interdum nulla, nec lacinia leo.`,
    })
}

export type sortingFunction = ((a: Product, b: Product) => number) | undefined
export const SORT_NAME_ASC: string = 'name_asc'
export const SORT_NAME_DESC: string = 'name_desc'

export type SortingFuncMap = {
    [key: string]: sortingFunction,
}
export const Sorters: SortingFuncMap = {
    SORT_NAME_ASC: (a: Product, b: Product) => Number(a.name > b.name) - Number(a.name < b.name),
    SORT_NAME_DESC: (a: Product, b: Product) => Number(a.name < b.name) - Number(a.name > b.name),
}

export function getSorter(sorting: string | undefined){
    return sorting ? (Sorters[sorting] ? Sorters[sorting] : undefined) : undefined
}

export function getProducts(page: number = 0, size: number = 1, sorting: string|undefined){
    page = page < 0 ? 0 : page
    size = size < 1 ? 1 : size
    const start = page * size
    // TODO: use api
    // api.getProducts()
    const res = prods.slice(start, start + size)
    if(sorting){
        res.sort(getSorter(sorting))
    }
    return res
}

export async function findProducts(search: string|undefined = "", page: number = 0, size: number = 1, sorting: string|undefined){
    if(!search || !search.length){
        return getProducts(page, size, sorting)
    }
    page = page < 0 ? 0 : page
    size = size < 1 ? 1 : size
    return new Promise<Product[]>((resolve, reject) => {
        setTimeout(() => {
            const res = [...prods]
                .filter(prod => prod.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
            if(sorting){
                res.sort(getSorter(sorting))
            }
            resolve(res.slice(page * size, size))
        }, 500)
    })
}

export function getRelevantProducts(amount: number){
    const res = [...prods]
    res.sort((a, b) => Number(a.relevance < b.relevance) - Number(a.relevance > b.relevance))
    return res.slice(0, amount)
}

export function getProductsCount(): Promise<number> {
    return new Promise((resolve, reject) => {
        resolve(prods.length)
    })
}


function randomImg(): string {
    const images = [
        'https://storage.makssamedov.ru/storage/ae2/img/whatsapp-tshirt.jpg',
        'https://storage.makssamedov.ru/storage/ae2/img/drive-scorpion.webp',
        'https://storage.makssamedov.ru/storage/ae2/img/garage.jpg',
    ]
    const index = Math.floor(Math.random() * images.length)
    return images[index]
}

