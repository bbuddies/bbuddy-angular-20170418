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
        //console.log('1')
        if(this.license.amount <= 0) {
            this.message += 'amount must > 0. '
        } else {
            this.message = ''
        }

        if(!/^\d\d\d\d([- /.])(0[1-9]|1[012])$/.test(this.license.month)) {
            this.message += 'invalid month format, must be "yyyy-mm". '
        } else {
            this.message = ''
        }

        this.licenses.add(this.license,
            () => this.$state.go('app.licenses.add'),
            (message) => this.message = message )
    }
}