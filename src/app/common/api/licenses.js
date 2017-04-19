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
    sum(startMonth, endMonth, callback) {
        this.http.get("fee", {
            start_date: startMonth,
            end_date: endMonth
        }, callback)
    }
}
