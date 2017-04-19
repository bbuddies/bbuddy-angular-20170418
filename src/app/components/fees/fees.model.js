import {Inject} from '../../common/decorators'

@Inject('api')
export default class Fees{
    constructor(api){
        this.api = api
    }
    fetchAll(callback){
        //this.api.licenses.all(callback)
        
    }
    fetchLicenseByFee(fee){
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
        const startMonth = new Date(feeStartDate).setDate(1)
        const endMonth = new Date(feeEndDate).setDate(1)
        const days = new Date(licenseMonth.getFullYear(), licenseMonth.getMonth()+1, 0).getDate()
        const startDate = new Date(feeStartDate).getTime()
        const endDate = new Date(feeEndDate).getTime()
        const licenseStartDate = licenseMonth.getTime()
        const licenseEndDate = licenseMonth.setMonth(licenseMonth.getMonth()+1)

        const amount = license.amount? license.amount : 0;
        let feeDays = 0

        // fee period in one month
        if (startMonth == licenseStartDate && endMonth == licenseStartDate) {
            feeDays = new Date(feeEndDate).getDate() - new Date(feeStartDate).getDate() + 1

        // fee of first month
        } else if (startMonth == licenseStartDate) {
            feeDays = days - new Date(feeStartDate).getDate() + 1;

        // fee of last month
        } else if (endMonth == licenseStartDate) {
            feeDays = new Date(feeEndDate).getDate();

        // fee of full month
        } else if (licenseStartDate >= startDate && licenseEndDate <= endDate) {
            feeDays = days
        }
    
        return Math.ceil(amount * feeDays/days)
    }

    async charge(fee, success, failure){
        var timerange = {
            start: '',
            end: ''
        }

        try {
            const licenses = await this.fetchLicenseByFee(fee)

            const fees = licenses.map((license) => this.licenseFee(fee.startdate, fee.enddate, license))
            console.log(fees)
        } catch(e) {
            console.log(e)
        }
    }
}
