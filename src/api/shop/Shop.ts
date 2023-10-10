import {api} from "../api";
import {Branch, getShopBranches} from "./Branch";

export interface IShopProps {
    id: number,
    businessId: string,
    name: string,
    image: string,
    branches?: Branch[]
}

export class Shop {
    private id: number
    private businessId: string
    private name: string
    private image: string
    private branches: Branch[] | null

    public constructor(props: IShopProps) {
        this.id = props.id
        this.businessId = props.businessId
        this.name = props.name
        this.image = props.image
        this.branches = props.branches ?? null
    }

    public getBranches(): Promise<Branch[]> {
        return new Promise(resolve => {
            if(this.branches !== null){
                resolve(this.branches)
            }else{
                getShopBranches(this.id).then(branches => {
                    this.branches = branches
                    resolve(branches)
                })
            }
        })
    }

    public getId = () => this.id
    public getName = () => this.name
    public getImage = () => this.image
}

export async function loadShop(shopSlug: string): Promise<IShopProps|null> {
    const image = "https://sun9-9.userapi.com/c857024/v857024189/44699/bu3bJDQE8j0.jpg"
    try{
        const headers = api.Auth().getHeaders()
        const res = await fetch(api.shopRoute("/api/shop/?shopSlugEq=" + shopSlug), {headers})
        const sh = (await res.json()).content[0]
        if(sh && sh.id){
            sh.image = sh.image || image
            return sh
        }
    }catch (e) {}

    return {
        id: 0,
        businessId: "test",
        name: "Fake shop",
        image: image,
        branches: [
            {
                id: 0,
                businessId: 'branch-1',
                name: 'Our first branch',
                address: 'Test street, 1',
                latitudeCoordinates: 1,
                longitudeCoordinates: 1,
                status: true,
                workDaysMask: '123',
                shopId: 0,
            },
            {
                id: 1,
                businessId: 'branch-2',
                name: 'Our second branch',
                address: 'Dev square 0xFF',
                latitudeCoordinates: 1,
                longitudeCoordinates: 1,
                status: true,
                workDaysMask: '123',
                shopId: 0,
            },
            {
                id: 2,
                businessId: 'branch-3',
                name: 'Lux branch',
                address: 'Front-end street 255',
                latitudeCoordinates: 1,
                longitudeCoordinates: 1,
                status: true,
                workDaysMask: '123',
                shopId: 0,
            },
            {
                id: 3,
                businessId: 'branch-4',
                name: 'Branch "Not-found"',
                address: 'Coding street, 0',
                latitudeCoordinates: 1,
                longitudeCoordinates: 1,
                status: true,
                workDaysMask: '123',
                shopId: 0,
            },
        ],
    }
}

