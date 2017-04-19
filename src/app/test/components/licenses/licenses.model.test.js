import Licenses from '../../../components/licenses/licenses.model';

describe('licenses model', function() {
    var license = {month: '2017-02', amount: 500}
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

        add.should.have.been.calledWith({month: '2017-02', amount: 500})
        success.should.have.been.called
    })

    it('license month should not be empty when adding an license', function(){
        license.month = ''

        licenses.add(license, success, failure)

        add.should.not.have.been.called
        failure.should.have.been.calledWith('License month should not be empty!')
    })

    it('license month should not be filled with blanks when adding an license', function(){
        license.month = '  '

        licenses.add(license, success, failure)

        add.should.not.have.been.called
        failure.should.have.been.calledWith('License month should not be empty!')
    })

    it('license amount should not be empty when adding an license', function(){
        license.amount = ''

        licenses.add(license, success, failure)

        add.should.not.have.been.called
        failure.should.have.been.calledWith('License amount should not be empty!')
    })

    it('license amount should not less than 0', function(){
        license.amount = 0

        licenses.add(license, success, failure)

        add.should.not.have.been.called
        failure.should.have.been.calledWith('License amount should not less than 0')
    })

    it('license amount should not be 0', function(){
        license.amount = -1

        licenses.add(license, success, failure)

        add.should.not.have.been.called
        failure.should.have.been.calledWith('License amount should not be 0')
    })
})
