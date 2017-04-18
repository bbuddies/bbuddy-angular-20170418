import {Inject} from '../decorators'

@Inject('http')
export default class Licenses {
    constructor(http){
        this.http = http
    }
    add(license, callback){
        console.log('yo')
        this.http.post("licenses", license, callback)
    }
}
