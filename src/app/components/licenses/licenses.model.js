import {Inject} from '../../common/decorators'
//import moment from 'moment'
var moment = require('moment')

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

    sum(startDate, endDate, success, fail) {
        this.api.licenses.sum(startDate, endDate, success)
    }

    _sumInLocal(licenses, startDate, endDate) {
        var startMonth = startDate.split('-').splice(0, 2).join('-')
        var endMonth = endDate.split('-').splice(0, 2).join('-')
        var startDay = parseInt(startDate.split('-')[2])
        var endDay = parseInt(endDate.split('-')[2])
        var totalAmount = 0

        if (startMonth === endMonth) {
            var index = licenses.findIndex((license)=> {
                return license.month === startMonth
            })
            var totalDays = moment(licenses[index].month).daysInMonth()
            var amount = licenses[index].amount
            var result = (amount / totalDays) * (endDay - startDay + 1)
            return result.toFixed(2)
        }

        licenses.forEach((license) => {
            if(!moment(license.month + '-01').isBetween(startDate, endDate, 'Month', '[]')){
                return;
            }

            if (license.month === startMonth) {

                var totalDays = moment(startMonth).daysInMonth()
                totalAmount += (totalDays - startDay + 1) * (license.amount / totalDays)

            } else if (license.month === endMonth) {

                var totalDays = moment(endMonth).daysInMonth()
                totalAmount += endDay * (license.amount / totalDays)

            } else {

                totalAmount += license.amount
            }
        })

        return totalAmount.toFixed(2)
    }

    localCalculate(startDate, endDate, success, fail) {
        this.api.licenses.getAll((licenses) => {
            var totalAmount = this._sumInLocal(licenses, startDate, endDate)
            success(totalAmount)
        })
    }
}
