import {Inject} from '../decorators'

@Inject('http')
export default class Accounts {
    constructor(http){
        this.http = http
    }
    add(license, callback){
        this.http.post("licenses", license, callback)
    }
}
