import {Inject} from '../../common/decorators'

@Inject('licensesModel', '$state')
export default class LicensesAddController {
    constructor(licenses, $state){
        this.licenses = licenses
        this.$state = $state
        this.license = {
            month: '2017-01',
            amount: 1000
        }
        this.message = ""
    }
    save(){
        console.log('1')
        this.licenses.add(this.license,
            () => this.$state.go('app.licenses.add'),
            (message) => this.message = message )
    }
}