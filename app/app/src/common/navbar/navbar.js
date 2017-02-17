import NavbarService from './navbar-service'

import navbarComponent from './navbar.component';


let navbarModule = angular.module('navbar', [
  
])
.component('navbar', navbarComponent)
.service('NavbarService', NavbarService);

export default navbarModule;
