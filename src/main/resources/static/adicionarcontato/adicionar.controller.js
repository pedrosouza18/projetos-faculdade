angular.module('agenda.adicionarContatos')

    .controller('AdicionarContatoCtrl', ['$scope', '$state', 'buscaContato', 'salvarContato', 'atualizarContato', '$mdToast' , function($scope , $state, buscaContato, salvarContato, atualizarContato,$mdToast) {

        $scope.object = {};

        $scope.salvar = function(){
            $state.go('listar');
            salvarContato.save($scope.object);
            $mdToast.show({
                template: '<md-toast class="md-toast"><div class="md-toast-content success"><b>Contato salvo com sucesso!</b></div></md-toast>',
                hideDelay: 3000,
                position: 'right'
            });
        }

    }]);
