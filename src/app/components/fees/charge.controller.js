import {Inject} from '../../common/decorators'

@Inject('feesModel', '$state')
export default class FeesChargeController {
    constructor(fees, $state){
        this.fees = fees 
        this.$state = $state
        this.fee = {
          startdate: '',
          enddate: ''
        }
        this.message = ""
    }
    charge(){
        this.fees.charge(this.fee,
            (total) => this.total = total,
            (message) => this.message = message )
    }
}
