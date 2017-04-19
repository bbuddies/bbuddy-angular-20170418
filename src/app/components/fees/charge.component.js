import angular from 'angular'
import FeesChargeController from './charge.controller'
import Fees from './fees.model'

function routing($stateProvider) {
    $stateProvider
        .state('app.feesCharge', {
            url: '/fees/charge',
            component: 'feesCharge',
            data:{
                requireAuth: true
            }
        });
}
routing.$inject = ['$stateProvider']

export default angular
    .module('fees.charge', [])
    .component('feesCharge', {
        template: require('./charge.html'),
        controller: FeesChargeController
    })
    .service('FeesModel', Fees)
    .config(routing)
    .name

