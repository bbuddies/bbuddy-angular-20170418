import {Inject} from '../../common/decorators'

@Inject('licensesModel', '$state')
export default class LicensesAddController {
    constructor(licenses, $state){
        this.licenses = licenses
        this.$state = $state
        this.query = {
            starteDate: '',
            endDate: '' 
        }
        this.message = ""
    }
    query(){
        this.licenses.query(this.query,
            () => {},
            (message) => window.alert(message))
    }
}