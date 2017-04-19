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
        
          api.licenses.all((licenses)=> {
            resolve(licenses)
          })

        })
    }
    charge(fee, success, failure){
        var timerange = []
        function filterDate(el) {
          timerange[el.month] = el.amount
        }

        this.fetchLicenseByFee(fee).then((licenses)=>{
          licenses.data.map(filterDate)
          console.log(timerange)
        })

    }
}
