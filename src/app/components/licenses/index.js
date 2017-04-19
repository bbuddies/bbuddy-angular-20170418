import angular from 'angular'
import add from './add.component'
import sum from './sum.component'

export default angular
    .module('licenses', [add, sum])
    .name