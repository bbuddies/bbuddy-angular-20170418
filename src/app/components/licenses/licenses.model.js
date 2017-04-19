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

    localCalculate(startDate, endDate, success, fail) {
        this.api.licenses.getAll((licenses)=> {
            var startMonth = startDate.split('-').splice(0, 2).join('-');
            var endMonth = endDate.split('-').splice(0, 2).join('-');
            var totalAmount = 0;

            var countDaysAmount = function (date, month, monthAmount) {
                var totalDays = moment(month).daysInMonth();
                return (totalDays - date + 1) * (monthAmount / totalDays);
            }

            licenses.forEach(function(license){
                if (moment(license.month + '-01').isBetween(startDate, endDate, 'Month', '[]')){

                    if (license.month === startMonth) {

                        totalAmount += countDaysAmount(startDate.split('-')[2], startMonth, license.amount);

                    } else if (license.month === endMonth) {

                        totalAmount += countDaysAmount(endDate.split('-')[2], endMonth, license.amount);

                    } else {

                        totalAmount += license.amount;
                    }
                }
            });
            success(totalAmount)
        })
    }
}