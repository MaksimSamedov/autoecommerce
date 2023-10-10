import {Branch} from "./shop/Branch";
import {Shop} from "./shop/Shop";


export interface ApiClient {
    branch: Branch|null
    shop: Shop
}


