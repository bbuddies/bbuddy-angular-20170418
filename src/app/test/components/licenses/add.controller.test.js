import Controller from '../../../components/licenses/add.controller';

describe('licenses add controller', function() {
    var licenses, $state, add, go, controller
    beforeEach(() => {
        licenses = {add: () => {}}
        add = sinon.stub(licenses, 'add').yields()
        $state = {go: ()=>{}}
        go = sinon.spy($state, 'go')
        controller = new Controller(licenses, $state)
        controller.license.month= '2017-04'
        controller.license.amount= 100000
    })
    it('add an license successfully', function(){
        controller.save()

        add.should.have.been.calledWith({month: '2017-04', amount: 100000})
        go.should.have.been.calledWith('app.licenses')
    })

    it('add an license failed', function(){
        add.callsArgWith(2, 'Error')
        controller.license.month= ''
        controller.license.amount= 0

        controller.save()

        add.should.have.been.calledWith({month: '', amount: 0})
        controller.message = 'Error'
    })
})
