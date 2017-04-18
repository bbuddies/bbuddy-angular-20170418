import angular from 'angular'
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
        template: require('./licenses.html')
    })
    .service('licensesModel', Licenses)
    .config(routing)
    .name