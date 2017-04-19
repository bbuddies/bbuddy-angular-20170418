import Licenses from '../../../components/licenses/licenses.model';

describe('licenses model', function() {
  var licensesModel;

    beforeEach(() => {
      var api = {licenses: {add: () => {}}}
      licensesModel = new Licenses(api)
    })

    it('Verify one month license period', function(){
      var licenses = [{
        month: '2017-01',
        amount: 200
      }];

      var result = licensesModel._sumInLocal(licenses, '2017-01-03', '2017-01-30')

      result.should.be.eql(180.65)
    })

    it('Verify cross months license period', function(){
      var licenses = [
        {
          month: '2017-01',
          amount: 200
        },
        {
          month: '2017-06',
          amount: 500
        }
      ];

      var result = licensesModel._sumInLocal(licenses, '2017-01-03', '2017-05-30')

      result.should.be.eql(187.1)
    })

    it('Verify cross months license period', function(){
      var licenses = [
        {
          month: '2017-01',
          amount: 200
        },
        {
          month: '2017-06',
          amount: 500
        }
      ];

      var result = licensesModel._sumInLocal(licenses, '2016-12-01', '2017-07-30')

      result.should.be.eql(700.00.toString())
    })

    it('Verify cross months license period', function(){
      var licenses = [
        {
          month: '2017-02',
          amount: 200
        },
        {
          month: '2017-03',
          amount: 500
        }
      ];

      var result = licensesModel._sumInLocal(licenses, '2017-02-15', '2017-03-30')

      result.should.be.eql(583.87)
    })
})
