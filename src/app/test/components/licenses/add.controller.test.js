import Controller from '../../../components/licenses/add.controller';

describe('licenses add controller', function() {
    var license, $state, add, alert, go, controller
    beforeEach(() => {
        license = {add: () => {}}
        add = sinon.stub(license, 'add').yields()
        $state = {go: ()=>{}}
        go = sinon.spy($state, 'go')
        global.window = {alert: () => {}}
        alert = sinon.stub(window, "alert", function(msg) { return msg; } );
        controller = new Controller(license, $state)
        controller.license.month = '2017-03'
        controller.license.amount= 100000
    })
    it('add an license successfully', function(){
        controller.save()

        add.should.have.been.calledWith({month: '2017-03', amount: 100000})
        go.should.have.been.calledWith('app.licenses')
    })
    it('set amount is 0 is invalid', function(){
        controller.license.amount = 0;
        controller.save();

        alert.should.have.been.called;
    })

    // it('add an account failed', function(){
    //     add.callsArgWith(2, 'Error')
    //     controller.account.name = ''
    //     controller.account.balance= 0

    //     controller.save()

    //     add.should.have.been.calledWith({name: '', balance: 0})
    //     controller.message = 'Error'
    // })
})
