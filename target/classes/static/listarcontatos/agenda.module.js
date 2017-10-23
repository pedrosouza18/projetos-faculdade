var app = angular.module("agenda.listarContatos", []);

app.config(function ($stateProvider) {

    var listarState = {
        name: 'listar',
        url: '/',
        templateUrl: 'listarcontatos/listar.html',
        controller: 'ListarCtrl'
    }

    $stateProvider.state(listarState);

})

app.factory('buscaContatos', function($resource) {

    return $resource('agenda', {}, {
        query : {
            method: 'GET',
            isArray: true
        }
    });
})

