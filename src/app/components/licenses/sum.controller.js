import {Inject} from '../../common/decorators'

@Inject('licensesModel', '$state')
export default class LicensesSumController {
    constructor(licenses, $state){
        this.licenses = licenses
        this.$state = $state
        this.message = ""
        this.sum = 0
    }

    getLicenses() {
        this.licenses.getAll(
            (res)=> {console.log(res)}
        )
    }

}
