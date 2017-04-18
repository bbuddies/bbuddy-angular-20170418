import {Inject} from '../../common/decorators'

@Inject('api')
export default class Licenses {
    constructor(api){
        this.api = api
    }
    fetchAll(callback){
        this.api.licenses.all(callback)
    }
    add(license, success, failure){
        if (license.name.trim().length == 0){
            failure('License name should not be empty!')
            return
        }
        this.api.licenses.add(license, success)
    }
}