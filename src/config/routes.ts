
export const ROUTE_BASE = "/:shop_slug"
let shop_slug = ''

export const ROUTE_HOME = "/"
export const ROUTE_CATALOG = "/catalog"
export const ROUTE_CART = "/cart"
export const ROUTE_CHECKOUT = "/checkout"
export const NO_SHOP_SELECTED = "/no-shop"


interface IAppRoutes {
    home: string
    catalog: string
    cart: string
    checkout: string
    noShopSelected: string
}

interface IUseRouteResponse {
    routes: IAppRoutes
    setSlug: (slug: string) => void
}

const setSlug = (slug: string) => {
    if(!shop_slug){
        shop_slug = slug
    }
}

const getRoute = (route: string) => {
    return shop_slug
        ? ('/' + shop_slug + route)
        : NO_SHOP_SELECTED
}

export const getSlug = () => {
    return shop_slug
}


export const useRoute = (): IUseRouteResponse => {
    return {
        routes: {
            home: getRoute(ROUTE_HOME),
            catalog: getRoute(ROUTE_CATALOG),
            cart: getRoute(ROUTE_CART),
            checkout: getRoute(ROUTE_CHECKOUT),
            noShopSelected: NO_SHOP_SELECTED,
        },
        setSlug,
    }
}

export const parseShopSlugFromUrl = (url: string) => {
    const parts = url.replace('//', '/').split('/')
    if(parts.length >= 2){
        setSlug(parts[1])
    }
}

parseShopSlugFromUrl(window.location.pathname)