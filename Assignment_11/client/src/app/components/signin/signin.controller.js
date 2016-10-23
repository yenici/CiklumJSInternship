import angular from 'angular';

class SigninController {
  constructor(OmdbService, $state, $rootScope) {
    this.omdbService = OmdbService;
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.errorMsg;
  }
  // $onInit() {}
  // $onChanges(changes) {}
  onSubmit() {
    if (this.password1 === this.password2) {
      this.omdbService.signin(this.username, this.password1).then(
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
    } else {
      this.errorMsg = 'Password does not match the confirm password.';
    }
  }
}

SigninController.$inject = ['OmdbService', '$state', '$rootScope'];

export default SigninController;
