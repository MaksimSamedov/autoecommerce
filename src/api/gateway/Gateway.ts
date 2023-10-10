import {tg} from "../telegram/WebApp/WebApp";
import {api} from "../api";
import {routes} from "../routes";
import {Auth} from "../Auth";


interface IGatewayProps {
    userAuthType: string
    token: string
}

export class Gateway {
    private userAuthType: string
    private token: string
    private userUuid: string|null

    public constructor(auth: Auth) {
        this.token = auth.getToken()
        this.userAuthType = auth.getAuthType()
        this.userUuid = null
    }

    public authorize(): Promise<string>{
        return new Promise((resolve, reject) => {
            if(this.userUuid){
                return resolve(this.userUuid)
            }

            fetch(routes.gateway.idByToken(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userAuthType: this.userAuthType,
                    token: this.token,
                })
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    if(res.isTokenCorrect && res.userUuid){
                        return resolve(res.userUuid)
                    }else{
                        return reject('Ошибка при авторизации')
                    }
                })
                .catch(reason => {
                    return reject('Непредвиденная ошибка при авторизации')
                })
        })
    }


}