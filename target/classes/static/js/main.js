var app = angular.module("agenda", ['ngMaterial','ui.router', 'ngResource', 'agenda.listarContatos', 'ui.mask', 'brasil.filters']);

app.config(function ($locationProvider, $urlRouterProvider) {

    $urlRouterProvider
        .when('/404', '/error' , ['$state', function ($state) {
            $state.go('listar');
        }])
        .otherwise('/');

    $locationProvider.html5Mode(true);

})
