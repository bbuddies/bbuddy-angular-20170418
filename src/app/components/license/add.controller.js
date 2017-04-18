import {Inject} from '../../common/decorators'

@Inject('licensesModel', '$state')
export default class LicensesAddController {
    constructor(licenses, $state){
        this.licenses = licenses
        this.$state = $state
        this.license = {
            name: '',
            balance: 0
        }
        this.message = ""
    }
    save(){
        this.licenses.add(this.license,
            () => this.$state.go('app.licenses'),
            (message) => this.message = message )
    }
}