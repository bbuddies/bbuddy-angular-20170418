import {Inject} from '../../common/decorators'

@Inject('licensesModel')
export default class LicensesController{
    constructor(licenses) {
        licenses.fetchAll((data) => this.licenses = data.data)
    }
}

