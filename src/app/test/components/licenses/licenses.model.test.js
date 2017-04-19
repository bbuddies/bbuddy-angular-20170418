import Licenses from '../../../components/licenses/licenses.model';

describe('licenses model', function() {
    var license = {month: '2017-3', amount: 100000}
    var api, add, licenses, success, failure
    beforeEach(() => {
        api = {licenses: {add: () => {}}}
        add = sinon.stub(api.licenses, 'add').yields({success: true, errors: []})
        licenses = new Licenses(api)
        success = sinon.spy()
        failure = sinon.spy()
    })
    it('add an license successfully', function(){
        licenses.add(license, success, failure)

        add.should.have.been.calledWith({month: '2017-3', amount: 100000})
        success.should.have.been.called
    })

    it('license amount should not be 0', function(){
        license.amount = 0

        licenses.add(license, success, failure)

        add.should.not.have.been.called
        failure.should.have.been.called
    })
})
