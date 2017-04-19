import Controller from '../../../components/licenses/list.controller';

describe('licenses controller', function() {
    it('Show all licenses', function(){
        var licenses = {fetchAll: () => {}}
        sinon.stub(licenses, 'fetchAll').yields([{month: '2017-02', amount: 1000}])
        var controller = new Controller(licenses)
        controller.licenses.should.eql([{month: '2017-02', amount: 1000}])
    })
})
