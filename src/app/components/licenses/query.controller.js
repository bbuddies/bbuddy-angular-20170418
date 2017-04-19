import {Inject} from '../../common/decorators'

@Inject('licensesModel', '$state')
export default class LicensesAddController {
    constructor(licenses, $state){
        this.licenses = licenses
        this.$state = $state
        this.query = {
            startDate: '2017-02-10',
            endDate: '2017-02-14' 
        }
        this.message = ""
    }
    queryAmount(){
        // get data from server
        this.licenses.queryFromServer(this.query,
            (amount) => this.message = amount,
            (message) => this.message = message)
        // local caculate
        // this.licenses.query(this.query,
        //     (amount) => this.message = amount,
        //     (message) => this.message = message)
    }
}