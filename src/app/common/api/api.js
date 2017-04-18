import {Inject} from '../decorators'

@Inject('authApi', 'accountsApi', 'licensesApi')
export default class Api {
    constructor(auth, accounts, licenses){
        this.auth = auth
        this.accounts = accounts
        this.licenses = licenses 
    }
}
