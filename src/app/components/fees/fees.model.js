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
    async charge(fee, success, failure){
        var timerange = {
          start: '',
          end: ''
        }

        try {
          const licenses = await this.fetchLicenseByFee(fee)
          timerange.start = new Date(fee.startdate)
          timerange.end = new Date(fee.enddate)

          console.log(licenses)
          const fees = licenses.map((el)=>{
            const licenseStartDate = new Date(el.month)
            const licenseEndMonth = new Date(el.month)
            licenseEndMonth.setMonth(licenseStartDate.getMonth()+1, 1)

            const monthPeriod = licenseEndMonth - licenseStartDate
                console.log('licenseStartDate: ' + licenseStartDate)
                console.log('timerange.start: ' + timerange.start)

            if (licenseStartDate < timerange.start && licenseEndMonth > timerange.end) {
                return el.amount * (timerange.end - timerange.start) / monthPeriod
            }

            if (licenseStartDate > timerange.start && licenseEndMonth > timerange.end) {
                return el.amount * (timerange.end - licenseStartDate) / monthPeriod
            }

            if (licenseStartDate < timerange.start && licenseEndMonth < timerange.end) {
                return el.amount * (licenseEndMonth - timerange.start) / monthPeriod
            }

            if (licenseStartDate >= timerange.start && licenseEndMonth < timerange.end) {
                return el.amount
            }

            return 0
          })

          console.log(fees)
        } catch(e) {
        
          console.log(e)
        }
    }
}
