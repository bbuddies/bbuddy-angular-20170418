import angular from 'angular'
import accounts from './accounts'
import licenses from './licenses'
import fees from './fees'
import dashboard from './dashboard'
import auth from './auth'

export default angular
    .module('components', [accounts, licenses, fees, dashboard, auth])
    .name
