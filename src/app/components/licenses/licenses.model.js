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
        var tempMonth = license.month
        var tempAmount = license.amount.toString()
        var year = parseInt(tempMonth.split('-')[0]);
        var month = parseInt(tempMonth.split('-')[1]);


        if (tempMonth.trim().length == 0){
            failure('License month should not be empty!')
            return
        }

        if (tempAmount.trim().length == 0){
            failure('License amount should not be empty!')
            return
        }

        if (license.amount <= 0){
            failure('License amount should be greater than zero!')
            return
        }

        if (!year || !month || month > 12) {
            failure('Please fill correct date EX:2017-02')
            return
        }

        this.api.licenses.add(license, success)
    }
}
