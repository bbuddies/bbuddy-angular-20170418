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

    sum(startMonth, endMonth, success, fail) {
        this.api.licenses.sum(startMonth, endMonth, success)
    }

    _sumInLocal(licenses, startDate, endDate) {
        var startMonth = startDate.split('-').splice(0, 2).join('-')
        var endMonth = endDate.split('-').splice(0, 2).join('-')
        var startDay = startDate.split('-')[2]
        var endDay = endDate.split('-')[2]
        var totalAmount = 0

        if (startMonth === endMonth) {
            var index = licenses.findIndex((license)=> {
                return license.month === startMonth
            })
            var totalDays = moment(licenses[index].month).daysInMonth()
            var amount = licenses[index].amount
            var result = (amount / totalDays) * (endDay - startDay + 1)
            return success(result)
        }

        var countDaysAmount = (date, month, monthAmount) => {
            var totalDays = moment(month).daysInMonth()
            return (totalDays - date + 1) * (monthAmount / totalDays)
        }

        licenses.forEach(function(license){
            if(!moment(license.month + '-01').isBetween(startDate, endDate, 'Month', '[]')){
                return;
            }

            if (license.month === startMonth) {

                totalAmount += countDaysAmount(startDay, startMonth, license.amount)

            } else if (license.month === endMonth) {

                totalAmount += countDaysAmount(endDay, endMonth, license.amount)

            } else {

                totalAmount += license.amount
            }
        })

        return totalAmount
    }

    localCalculate(startDate, endDate, success, fail) {
        this.api.licenses.getAll((licenses) => {
            var totalAmount = this._sumInLocal(licenses, startDate, endDate)
            success(totalAmount)
        })
    }
}
