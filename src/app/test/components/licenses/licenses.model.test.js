import Licenses from '../../../components/licenses/licenses.model';

describe('licenses model', function() {
    var api, add, licenses, fakeLicenses, success, failure
    describe('add license', function() {
        var license = {month: '2017-3', amount: 100000}
         beforeEach(() => {
            api = {licenses: {add: () => {}}}
            add = sinon.stub(api.licenses, 'add').yields({success: true, errors: []})
            fakeLicenses = [
                {
                    month: '2017-02',
                    amount: 28
                },
                {
                    month: '2017-03',
                    amount: 0
                },
                {
                    month: '2017-04',
                    amount: 30
                },
                {
                    month: '2017-05',
                    amount: 31
                }
            ]
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
        it('license fee during 2017-02-10 to 2017-02-14 and 2017-02 license amount is 28 sholud be 5', function() {
            let query = {};
            query.startDate = '2017-02-10';
            query.endDate = '2017-02-14';
            licenses.caculateAmount(fakeLicenses, query, success, failure);
            success.should.have.been.calledWith(5);
        })
        it('license fee during 2017-04-14 to 2017-05-31 sholud be 48', function() {

            let query = {};
            query.startDate = '2017-04-14';
            query.endDate = '2017-05-31';
            licenses.caculateAmount(fakeLicenses, query, success, failure);
            success.should.have.been.calledWith(48);
        })
        it('license fee during 2017-02-16 to 2017-04-30 sholud be 43', function() {

            let query = {};
            query.startDate = '2017-02-16';
            query.endDate = '2017-04-30';
            licenses.caculateAmount(fakeLicenses, query, success, failure);
            success.should.have.been.calledWith(43);
        })
   }) 
})
