import {Inject} from '../decorators'

@Inject('http')
export default class License {
    constructor(http){
        this.http = http
    }
    add(account, callback){
        this.http.post("license", account, callback)
    }
}
