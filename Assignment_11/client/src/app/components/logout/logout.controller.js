import angular from 'angular';

class LogoutController {
  constructor($state, $rootScope) {
    this.$state = $state;
    this.$rootScope = $rootScope;
  }
  $onInit() {
    this.$rootScope.token = undefined;
    this.$rootScope.username = undefined;
    this.$state.go('home');
  }
}

LogoutController.$inject = ['$state', '$rootScope'];

export default LogoutController;
