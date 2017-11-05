angular.module('agenda.login')
.controller('LoginCtrl', ['$scope', '$state' , function($scope , $state) {

    $scope.entrar = function () {
        $state.go('listar');
    }

}]);