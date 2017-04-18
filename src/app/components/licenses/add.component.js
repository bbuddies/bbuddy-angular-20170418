import angular from 'angular'
import LicensesAddController from './add.controller'
import Licenses from './accounts.model'

function routing($stateProvider) {
    $stateProvider
        .state('app.accountsAdd', {
            url: '/licenses/add',
            component: 'licensesAdd',
            data:{
                requireAuth: true
            }
        });
}
routing.$inject = ['$stateProvider']

export default angular
    .module('accounts.add', [])
    .component('accountsAdd', {
        template: require('./add.html'),
        controller: AccountsAddController
    })
    .service('accountsModel', Accounts)
    .config(routing)
    .name

