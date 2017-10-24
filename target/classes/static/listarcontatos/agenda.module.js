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

app.factory('salvarContato', function($resource) {

    return $resource('agenda', {}, {
        save : {
            method: 'POST'
        }
    });
})

app.factory('atualizarContato', function($resource) {

    return $resource('agenda/atualizar/:contatoId', {}, {
        'update' : {
            method: 'PUT'
        }
    });
})

app.factory('excluirContato', function($resource) {

    return $resource('agenda/excluir/:contatoId', {}, {
        delete : {
            method: 'DELETE'
        }
    });
});
