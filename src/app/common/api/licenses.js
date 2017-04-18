import {Inject} from '../decorators'

@Inject('http')
export default class Licenses {
    constructor(http){
        this.http = http
    }
    all(callback){
        this.http.get("licenses", callback)
    }
    add(license, callback){
        this.http.post("licenses", license, callback)
    }
}
