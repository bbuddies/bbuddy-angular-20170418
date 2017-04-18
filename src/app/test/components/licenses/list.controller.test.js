import Controller from '../../../components/licenses/list.controller';

describe('licenses controller', function() {
    it('Show all licenses', function(){
        var licenses = {fetchAll: () => {}}
        sinon.stub(licenses, 'fetchAll').yields([{id: 1, name: 'ICBC', balance: 1000}])
        var controller = new Controller(licenses)
        controller.licenses.should.eql([{id: 1, name: 'ICBC', balance: 1000}])
    })
})
