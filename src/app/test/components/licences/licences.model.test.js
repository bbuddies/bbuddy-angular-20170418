import Licenses from '../../../components/licenses/licenses.model';

describe('licences model', function() {
    var licence = {month: '2017-02', amount: 500}
    var api, add, licences, success, failure
    beforeEach(() => {
        api = {licenses: {add: () => {}}}
        add = sinon.stub(api.licenses, 'add').yields({success: true, errors: []})
        licences = new Licenses(api)
        success = sinon.spy()
        failure = sinon.spy()
    })
    it('add an licence successfully', function(){
        licences.add(licence, success, failure)

        add.should.have.been.calledWith({month: '2017-02', amount: 500})
        success.should.have.been.called
    })
})
