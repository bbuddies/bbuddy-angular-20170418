import {Inject} from '../../common/decorators'

@Inject('licensesModel', '$state')
export default class LicensesSumController {
    constructor(licenses, $state){
        this.licenses = licenses
        this.$state = $state
        this.message = ""

        this.sum = 0
        this.startMonth = '2017-01-11'
        this.endMonth = '2017-11-11'

        this.localSum = 0
    }

    getLicenses() {
        this.licenses.getAll(
            (res)=> {console.log(res)},
            (error)=> {console.error(error)}
        )
    }

    localCalculate() {
        this.licenses.localCalculate(
            this.startMonth,
            this.endMonth,
            (fee)=> {this.localSum = fee.toFixed(2)},
            ()=> {}
        )
    }

    calculate() {
        this.licenses.sum(
            this.startMonth,
            this.endMonth,
            (res)=> {
                console.log(res)
                this.sum = res.fee
            },
            (error)=> {console.error(error)}
        )
    }
}
