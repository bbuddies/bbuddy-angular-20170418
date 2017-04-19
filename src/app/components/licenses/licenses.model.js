import {Inject} from '../../common/decorators'

@Inject('api')
export default class Licenses {
    constructor(api){
        this.api = api
    }

    add(license, success, failure){

        if(license.amount <= 0) {
            failure('amount must > 0. ')
            return
        }

        if(!/^\d\d\d\d([- /.])(0[1-9]|1[012])$/.test(license.month)) {
            failure('invalid month format, must be "yyyy-mm". ')
            return
        }

        this.api.licenses.add(license, success)
    }

    getAll(success, fail) {
        this.api.licenses.getAll(success)
    }

    sum(startMonth, endMonth, success, fail) {
        this.api.licenses.sum(startMonth, endMonth, success)
    }
}