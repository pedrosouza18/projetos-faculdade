var app = angular.module("agenda", ['ngMaterial','ui.router', 'ngResource', 'agenda.login' ,'agenda.listarContatos', 'agenda.adicionarContatos' , 'ui.mask', 'brasil.filters']);

app.config(function ($locationProvider, $urlRouterProvider) {

    $urlRouterProvider
        .when('/404', '/error', '/notFound')
        .otherwise('/');

    $locationProvider.html5Mode(true);

})
