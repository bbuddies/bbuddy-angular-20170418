import {Inject} from '../../common/decorators'

@Inject('api')
export default class Accounts {
    constructor(api){
        this.api = api
    }
    add(license, success, failure){
        this.api.licenses.add(license, success)
    }
}