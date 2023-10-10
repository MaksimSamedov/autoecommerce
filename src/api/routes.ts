import {api} from "./api";

export const routes = {
    branch: {
        read: (id: string|number) => api.shopRoute('/api/branch/' + id),
        find: (query: string = '') => api.shopRoute('/api/branch/?' + query),
    },
    gateway: {
        idByToken: () => api.route('/openapi/auth/id-by-token'),
    }
}