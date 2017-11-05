var app = angular.module("agenda.login", []);

app.config(function ($stateProvider) {

    var loginState = {
        name: 'login',
        url: '/',
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    }

    $stateProvider.state(loginState);

});