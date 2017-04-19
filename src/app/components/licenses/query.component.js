import angular from 'angular'
import LicensesQueryController from './query.controller'
import Licenses from './licenses.model'

function routing($stateProvider) {
    $stateProvider
        .state('app.licensesQuery', {
            url: '/licenses/query',
            component: 'licensesQuery',
            data:{
                requireAuth: true
            }
        });
}
routing.$inject = ['$stateProvider']

export default angular
    .module('licenses.query', [])
    .component('licensesQuery', {
        template: require('./query.html'),
        controller: LicensesQueryController
    })
    .service('licensesModel', Licenses)
    .config(routing)
    .name

