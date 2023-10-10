import {tg} from "./telegram/WebApp/WebApp";


export interface IAuthProps {
    authType: string
    token: string
}

export class Auth {
    private authType: string
    private token: string

    public constructor({authType, token}: IAuthProps) {
        this.authType = authType
        this.token = token
    }

    public getHeaders() {
        return {
            'AuthType': this.authType,
            'Authorization': this.token,
        }
    }

    public getAuthType() {
        return this.authType
    }

    public getToken() {
        return this.token
    }
}

const testToken = ''

const auth = new Auth(
    tg.platform
    ? {
        authType: 'TELEGRAM',
        token: tg.WebApp().token,
    }
    : {
        authType: 'TELEGRAM', //'GOOGLE', // todo другая авторизация в браузере
        token: testToken,
    })
export const GetAuth = () => auth