import angular from 'angular'
import LicensesAddController from './add.controller'
import Licenses from './licenses.model'

function routing($stateProvider) {
    $stateProvider
        .state('app.LicensesAdd', {
            url: '/licenses/add',
            component: 'licensesAdd',
            data:{
                requireAuth: true
            }
        });
}
routing.$inject = ['$stateProvider']

export default angular
    .module('licenses.add', [])
    .component('licensesAdd', {
        template: require('./add.html'),
        controller: LicensesAddController
    })
    .service('licensesModel', Licenses)
    .config(routing)
    .name

