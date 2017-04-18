import {Inject} from '../../common/decorators'

@Inject('api')
export default class Licenses {
    constructor(api){
        this.api = api
    }
    add(license, success, failure){
        console.log('2')
        console.log(this.api)
        this.api.licenses.add(license, success)
    }
}