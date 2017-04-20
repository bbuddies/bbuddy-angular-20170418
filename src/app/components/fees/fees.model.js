import {Inject} from '../../common/decorators'

@Inject('api')
export default class Fees{
    constructor(api){
        this.api = api
    }
    fetchLicense(){
        let api = this.api
        return new Promise((resolve, reject) => {
            api.licenses.all((res)=> {
                resolve(res.data)
            })
        })
    }

    // feeStartDate: xxxx-xx
    licenseFee(feeStartDate, feeEndDate, license) {
        const licenseMonth = new Date(license.month)
        const days = new Date(licenseMonth.getFullYear(), licenseMonth.getMonth()+1, 0).getDate()
        const startDate = new Date(feeStartDate)
        const endDate = new Date(feeEndDate)
        const licenseStartDate = new Date(license.month)
        const licenseEndDate = new Date(licenseMonth.setMonth(licenseMonth.getMonth()+1, 0))

        const maxStartDate = licenseStartDate > startDate? licenseStartDate: startDate
        const minEndDate = licenseEndDate < endDate? licenseEndDate: endDate

        if (maxStartDate > minEndDate) {
            return 0
        } else {
            const feeDays = minEndDate.getDate() - maxStartDate.getDate() + 1
            return Math.ceil(license.amount * feeDays/days)
        }
    }

    async charge(fee, success, failure){
        try {
            const licenses = await this.fetchLicense()
            const fees = licenses.map((license) => this.licenseFee(fee.startdate, fee.enddate, license))
            const total = fees.reduce(function (a, b) {return a + b}, 0) || 0
            success(total)
        } catch(e) {
            console.log(e)
        }
    }
}
