import {ApiClient} from "./ApiClient";
import {Auth, GetAuth} from "./Auth";
import {Gateway} from "./gateway/Gateway";

interface ApiInterface {
    readonly api_url: string,
    readonly api_version: string,
}

class API implements ApiInterface {
    readonly api_url: string
    readonly api_version: string
    private client: ApiClient|null
    private auth: Auth
    private gateway: Gateway

    constructor(api_url: string|undefined, api_version: string|undefined) {
        if(!api_url) throw new Error("API_URL is not specified")
        if(!api_version) throw new Error("API_VERSION is not specified")

        this.api_url = api_url
        this.api_version = api_version
        this.client = null
        this.auth = GetAuth()
        this.gateway = new Gateway(this.auth)
        Object.freeze(this)
    }

    route(path: string): string {
        return this.api_url + path
    }

    shopRoute(path: string): string {
        return this.route(process.env.REACT_APP_SHOP_API_URL_ROUTE + path)
    }

    Auth(): Auth {
        return this.auth
    }

    authorize(): Promise<string> {
        return this.gateway.authorize()
    }
}

export const api = new API(
    process.env.REACT_APP_API_URL,
    process.env.REACT_APP_API_VERSION,
)
