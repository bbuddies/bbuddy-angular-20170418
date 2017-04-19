import {Inject} from '../../common/decorators'

@Inject('api')
export default class Licenses{
    constructor(api){
        this.api = api
    }
    fetchAll(callback){
        this.api.licenses.all(callback)
    }
    add(license, success, failure){
        var tempMonth = license.month;
        var tempAmount = license.amount.toString();

        if (tempMonth.trim().length == 0 || tempAmount.trim().length == 0){
            failure('License month or amount should not be empty!')
            return
        }
        this.api.licenses.add(license, success)
    }
}
