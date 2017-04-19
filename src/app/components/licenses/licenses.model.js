import {Inject} from '../../common/decorators'
import moment from 'moment'

@Inject('api')
export default class Licenses {
    constructor(api){
        this.api = api
    }
    queryFromServer(query, success, failure) {
        this.api.licenses.caculateFromServer(query, (res) => success(res))
    }
    query(query, success, failure) {
        this.api.licenses.fetchAll((res) => {
            caculateAmount(res, query, success, failure)
        })
    }
    caculateAmount(licenses, query, success, failure) {
        const formatLicenses = {}
        licenses.forEach(license => {
            const monthDay = moment(license.month).add(1, 'M').date(1).subtract(1, 'days').date();
            const index = `${moment(license.month).year()}${moment(license.month).month()}`;
            formatLicenses[index] = Math.floor(license.amount / monthDay);
        })
        const getDayAmount = (date) => {
            return formatLicenses[`${date.year()}${date.month()}`] || 0;
        }
        const endDate = moment(query.endDate);
        let date = moment(query.startDate);;
        let total = 0;
        while(date.isSameOrBefore(endDate)) {
            total = total + getDayAmount(date);
            date = date.add(1, 'd');
        }
        success(total);
    }
    add(license, success, failure){
        const isInvalidAmount = license.amount < 0 || license.amount === 0;
        if (isInvalidAmount) {
            failure('yy');
            return;
        }
        this.api.licenses.add(license, success)
    }
}