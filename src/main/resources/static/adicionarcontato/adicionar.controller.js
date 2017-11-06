angular.module('agenda.adicionarContatos')

    .controller('AdicionarContatoCtrl', ['$scope', '$state', '$stateParams' , 'buscaContato', 'salvarContato', 'atualizarContato', '$mdToast' , function($scope , $state, $stateParams ,buscaContato, salvarContato, atualizarContato,$mdToast) {

        $scope.object = {};

        $scope.contatoSalvo = false;

        if($stateParams.contatoId){
            buscaContato.get({contatoId: $stateParams.contatoId})
                .$promise.then(function (data) {
                $scope.object = angular.copy(data);
            })
                .catch(function (error) {
                    console.log(error);
                })
        }

        $scope.salvar = function(){
            if($stateParams.contatoId){
                $scope.contatoSalvo = true;
                atualizarContato.update({contatoId: $stateParams.contatoId}, $scope.object)
                    .$promise.then(function (data) {
                        setTimeout(function () {
                            $mdToast.show({
                                template: '<md-toast class="md-toast"><div class="md-toast-content success"><b>Contato atualizado com sucesso!</b></div></md-toast>',
                                hideDelay: 3000,
                                position: 'right'
                            });
                            $scope.contatoSalvo = false;
                            $state.go('listar');
                        }, 3000);
                })
            } else {
                $scope.contatoSalvo = true;
                salvarContato.save($scope.object);
                setTimeout(function () {
                    $mdToast.show({
                        template: '<md-toast class="md-toast"><div class="md-toast-content success"><b>Contato salvo com sucesso!</b></div></md-toast>',
                        hideDelay: 3000,
                        position: 'right'
                    });
                    $scope.contatoSalvo = false;
                    $state.go('listar');
                }, 3000);
            }
        }

    }]);
