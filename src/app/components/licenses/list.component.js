import angular from 'angular'
import LicensesController from './list.controller'
import Licenses from './licenses.model'

function routing($stateProvider) {
    $stateProvider
        .state('app.licenses', {
            url: '/licenses',
            component: 'licenses',
            data:{
                requireAuth: true
            }
        });
}
routing.$inject = ['$stateProvider']

export default angular
    .module('licenses.list', [])
    .component('licenses', {
        template: require('./list.html'),
        controller: LicensesController
    })
    .service('licensesModel', Licenses)
    .config(routing)
    .name

