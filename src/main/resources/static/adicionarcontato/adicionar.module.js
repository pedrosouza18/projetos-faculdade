var app = angular.module("agenda.adicionarContatos", []);

app.config(function ($stateProvider) {

    var adicionarState = {
        name: 'adicionar',
        url: '/adicionar-contato',
        templateUrl: 'adicionarcontato/adicionar.html',
        controller: 'AdicionarContatoCtrl'
    }

    var editarContato = {
        name: 'editarcontato',
        url: '/{contatoId: int}/editar-contato',
        templateUrl: 'adicionarcontato/adicionar.html',
        controller: 'AdicionarContatoCtrl'
    }

    $stateProvider.state(adicionarState);
    $stateProvider.state(editarContato);

})

app.factory('buscaContato', function($resource) {

    return $resource('agenda/:contatoId', {}, {
        get : {
            method: 'GET'
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

