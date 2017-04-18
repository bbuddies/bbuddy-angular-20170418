import angular from 'angular'
import accounts from './accounts'
import dashboard from './dashboard'
import licenses from './licenses'
import auth from './auth'

export default angular
    .module('components', [accounts, dashboard, licenses, auth])
    .name