import angular from 'angular'
import accounts from './accounts'
import licenses from './licenses'
import dashboard from './dashboard'
import auth from './auth'

export default angular
    .module('components', [accounts, licenses, dashboard, auth])
    .name
