import {Inject} from '../../common/decorators'

@Inject('api')
export default class Licenses {
    constructor(api){
        this.api = api
    }
    add(license, success, failure){
        var flag = true

        if(license.amount <= 0) {
            failure('amount must > 0. ')
            flag = false
        }

        if(!/^\d\d\d\d([- /.])(0[1-9]|1[012])$/.test(license.month)) {
            failure('invalid month format, must be "yyyy-mm". ')
            flag = false
        }

        if(flag) {
            this.api.licenses.add(license, success)
        }
    }
}