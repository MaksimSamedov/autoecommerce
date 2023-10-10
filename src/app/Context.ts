import {loadShop, Shop} from "../api/shop/Shop";
import {Branch} from "../api/shop/Branch";
import {Gateway} from "../api/gateway/Gateway";
import {api} from "../api/api";

interface IContextProps {
    shop: Shop
    branch: Branch|null
}

type listener = (branch: Branch) => void

class AppContext {
    private shop: Shop
    private branch: Branch|null

    private listeners: listener[] = []

    public constructor({shop, branch}: IContextProps) {
        this.shop = shop
        this.branch = branch
    }

    public Shop() {
        return this.shop
    }

    public Branch() {
        return this.branch
    }

    public setBranch(branch: Branch) {
        if(this.branch !== branch){
            this.branch = branch
            this.listeners.forEach(listener => listener(branch))
        }
    }

    public onSwitchBranch(callback: (branch: Branch) => void){
        this.listeners.push(callback)
    }
}

let context: AppContext


interface ISetupProps {
    shopSlug: string
}
export const setupContext = ({shopSlug}: ISetupProps): Promise<AppContext> => {
    return new Promise((resolve, reject) => {
        // api.authorize()
        //     .then(() => {
                loadShop(shopSlug).then((shopInfo) => {
                    if(!shopInfo){
                        return reject("Shop not found")
                    }

                    context = new AppContext({
                        shop: new Shop(shopInfo),
                        branch: null,
                    })
                    return resolve(context)
                })
            // })
            // .catch(reason => {
            //     reject(reason)
            // })

    })
}

export const useApp = () => {
    return {
        context: context,
        shop: context.Shop(),
        branch:  context.Branch(),
    }
}