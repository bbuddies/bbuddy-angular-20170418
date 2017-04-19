import {Inject} from '../decorators'

@Inject('http')
export default class Licenses {
    constructor(http){
        this.http = http
    }
    add(license, callback) {
        this.http.post("licenses", license, callback)
    }
    getAll(callback) {
        this.http.get("licenses", callback)
    }
}
