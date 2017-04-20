import {Inject} from '../../common/decorators'

@Inject('licensesModel', '$state')
export default class LicensesSumController {
    constructor(licenses, $state){
        this.licenses = licenses
        this.$state = $state
        this.message = ""

        this.sum = 0
        this.localSum = 0
        this.startDate = '2017-01-11'
        this.endDate = '2017-11-11'
    }

    getLicenses() {
        this.licenses.getAll(
            (res)=> {console.log(res)},
            (error)=> {console.error(error)}
        )
    }

    localCalculate() {
        this.licenses.localCalculate(
            this.startDate,
            this.endDate,
            (fee)=> {this.localSum = fee},
            ()=> {}
        )
    }

    calculate() {
        this.licenses.sum(
            this.startDate,
            this.endDate,
            (res)=> {
                console.log(res)
                this.sum = res.fee
            },
            (error)=> {console.error(error)}
        )
    }
}
