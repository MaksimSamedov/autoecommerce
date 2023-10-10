import {routes} from "../routes";
import {api} from "../api";


export interface Branch {
    id: number
    businessId: string
    address: string
    name: string
    latitudeCoordinates: number
    longitudeCoordinates: number
    status: boolean
    workDaysMask: string
    shopId: number
}


export const getShopBranches = (shopId: number): Promise<Branch[]> => {
    return new Promise(resolve => {
        const query = new URLSearchParams()
        query.set('shopIdEq', '' + shopId)
        fetch( routes.branch.find(query.toString()), {
            method: 'GET',
            headers: api.Auth().getHeaders(),
        })
            .then(res => res.json())
            .then(res => {
                resolve(res.content)
            })
    })
}

