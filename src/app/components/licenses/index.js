import angular from 'angular'
import licenses from './licenses.component'
import add from './add.component'
import query from './query.component'

export default angular
    .module('licenses', [licenses, add, query])
    .name

