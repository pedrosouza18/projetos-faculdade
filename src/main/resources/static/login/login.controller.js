angular.module('agenda.login')
.controller('LoginCtrl', ['$scope', '$state', 'buscaLogin', '$mdToast' , function($scope , $state, buscaLogin, $mdToast) {

    $scope.object = {};

    $scope.listLogin = [];

    $scope.loginCorreto = false;

    buscaLogin.query()
        .$promise.then(function(data){
            $scope.listLogin = data;
        })
        .catch(function(error){
            console.log(error);
        })


    $scope.entrar = function () {
        $scope.listLogin.forEach(function(login){
            if($scope.object.login === login.nome && $scope.object.senha === login.senha){
                $scope.loginCorreto = true;
                setTimeout(function(){
                    $scope.loginCorreto = false;
                    $state.go('listar');
                }, 3000);
            } else {
                $mdToast.show({
                    template: '<md-toast class="md-toast"><div class="md-toast-content error"><b>Login incorreto!</b></div></md-toast>',
                    hideDelay: 3000,
                    position: 'right'
                });
            }
        })
    }

}]);