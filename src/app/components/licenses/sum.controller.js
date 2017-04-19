import {Inject} from '../../common/decorators'

@Inject('licensesModel', '$state')
export default class LicensesSumController {
    constructor(licenses, $state){
        this.licenses = licenses
        this.$state = $state
        this.message = ""

        this.sum = 0
        this.startMonth = '2017-01'
        this.endMonth = '2017-11'
    }

    getLicenses() {
        this.licenses.getAll(
            (res)=> {console.log(res)},
            (error)=> {console.error(error)}
        )
    }

    calculate() {
        this.licenses.sum(
            this.startMonth,
            this.endMonth,
            (res)=> {
                console.log(res)
                this.sum = res
            },
            (error)=> {console.error(error)}
        )
    }
}
