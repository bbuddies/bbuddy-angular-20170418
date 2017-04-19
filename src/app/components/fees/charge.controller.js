import {Inject} from '../../common/decorators'

@Inject('feesModel', '$state')
export default class feesAddController {
    constructor(fees, $state){
        this.fees = fees 
        this.$state = $state
        this.fee = {
        }
        this.message = ""
    }
    save(){
        this.fees.add(this.fee,
            () => this.$state.go('app.fees'),
            (message) => this.message = message )
    }
}
