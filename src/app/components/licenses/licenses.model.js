import {Inject} from '../../common/decorators'

@Inject('api')
export default class Licenses {
    constructor(api){
        this.api = api
    }
    add(license, success, failure){
        const isInvalidAmount = license.amount < 0 || license.amount === 0;
        if (isInvalidAmount) {
            failure('yy');
            return;
        }
        this.api.licenses.add(license, success)
    }
}