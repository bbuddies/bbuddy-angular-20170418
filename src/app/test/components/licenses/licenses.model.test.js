import Licenses from '../../../components/licenses/licenses.model';

describe('licenses model', function() {
    var api, add, licenses, success, failure
    describe('add license', function() {
        var license = {month: '2017-3', amount: 100000}
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
   describe('license fee query', function() {
        var query = {startDate: '2017-02', amount: 100000}
         beforeEach(() => {
            api = {licenses: {query: () => {}}}
            add = sinon.stub(api.licenses, 'add').yields({success: true, errors: []})
            licenses = new Licenses(api)
            success = sinon.spy()
            failure = sinon.spy()
        })
        it('license fee during 2017-02-10 to 2017-02-14 and 2017-02 license amount is 28 sholud be 50', function() {
            query.startDate = '2017-02-10';
            query.endDate = '2017-02-14';
            licenses.queryFee(query).equal(50);
        })
   }) 
})
