import Licenses from '../../../components/licenses/licenses.model';

describe('licenses model', function() {
    var license = {month: '2017-04', amount: 100000}
    var api, add, licenses, success, failure
    beforeEach(() => {
        api = {licenses: {add: () => {}}}
        add = sinon.stub(api.licenses, 'add').yields({success: true, errors: []})
        licenses = new Licenses(api)
        success = sinon.spy()
        failure = sinon.spy()
    })
    it('add an licenses successfully', function(done){
        licenses.add(license, success, failure)
        setTimeout(function () {
          add.should.have.been.calledWith({month: '2017-04', amount: 100000})
          success.should.have.been.called
          done()
        }, 1000)
    })

    it('license month should not be empty when adding an license', function(){
        license.month= ''

        licenses.add(license, success, failure)

        add.should.not.have.been.called
        failure.should.have.been.calledWith('License month or amount should not be empty!')
    })
    it('license month should not be filled with blanks when adding an license', function(){
        license.month = '  '

        licenses.add(license, success, failure)

        add.should.not.have.been.called
        failure.should.have.been.calledWith('License month or amount should not be empty!')
    })

    it('license amount should not be empty when adding an license', function(){
        license.month= ''

        licenses.add(license, success, failure)

        add.should.not.have.been.called
        failure.should.have.been.calledWith('License month or amount should not be empty!')
    })
    it('license amount should not be filled with blanks when adding an license', function(){
        license.month = '  '

        licenses.add(license, success, failure)

        add.should.not.have.been.called
        failure.should.have.been.calledWith('License month or amount should not be empty!')
    })
})
