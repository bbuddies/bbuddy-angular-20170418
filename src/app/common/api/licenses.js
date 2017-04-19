import {Inject} from '../decorators'

@Inject('http')
export default class Accounts {
    constructor(http){
        this.http = http
    }
    add(license, callback){
        this.http.post("licenses", license, callback)
    }
    fetchAll(callback) {
        this.http.get('licenses', callback)
    }
    caculateFromServer(query, callback) {
        this.http.get(`search?start=${query.startDate}&end=${query.endDate}`, callback)
    }
}
