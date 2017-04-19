import angular from 'angular'
import LicensesSumController from './sum.controller'
import Licenses from './licenses.model'

function routing($stateProvider) {
    $stateProvider
        .state('app.licensesSum', {
            url: '/licenses/sum',
            component: 'licensesSum',
            data:{
                requireAuth: true
            }
        });
}
routing.$inject = ['$stateProvider']

export default angular
    .module('licenses.sum', [])
    .component('licensesSum', {
        template: require('./sum.html'),
        controller: LicensesSumController
    })
    .service('licensesModel', Licenses)
    .config(routing)
    .name

