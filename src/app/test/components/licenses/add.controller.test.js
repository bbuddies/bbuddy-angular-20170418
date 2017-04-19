import Controller from '../../../components/licenses/add.controller';

describe('licenses add controller', function() {
    var licenses, $state, add, go, controller
    beforeEach(() => {
        licenses = {add: () => {}}
        add = sinon.stub(licenses, 'add').yields()
        $state = {go: ()=>{}}
        go = sinon.spy($state, 'go')
        controller = new Controller(licenses, $state)
        controller.license.month = '2017-02'
        controller.license.amount = 500
    })
    it('add an license successfully', function(){
        controller.save()

        add.should.have.been.calledWith({month: '2017-02', amount: 500})
        go.should.have.been.calledWith('app.licenses.add')
    })
})
