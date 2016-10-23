import angular from 'angular';

class LoginController {
  constructor(OmdbService, $state, $rootScope) {
    this.omdbService = OmdbService;
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.errorMsg;
  }
  // $onInit() {}
  // $onChanges(changes) {}
  onSubmit() {
    this.omdbService.login(this.username, this.password).then(
      (res) => {
        if (res.success) {
          this.$rootScope.token = res.token;
          this.$rootScope.username = res.username;
          this.$state.go('home');
        } else {
          this.$rootScope.token = undefined;
          this.errorMsg = res.message;
        }
      }
    );
  }
}

LoginController.$inject = ['OmdbService', '$state', '$rootScope'];

export default LoginController;
