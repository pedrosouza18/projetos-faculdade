angular.module('agenda.listarContatos')
    .filter('filterFavoritos', function () {
        return function (lista, exibirFavoritos) {
            var array = [];
                lista.forEach(function (contato) {
                    if(exibirFavoritos == true) {
                        if(contato.favorito == true) {
                            array.push(contato);
                        }
                    }
                    else{
                        array.push(contato);
                    }
                });

            return array;
        }

    })
    .controller('ListarCtrl', ['$scope', '$state', 'buscaContatos', '$mdDialog', 'salvarContato', 'atualizarContato', '$mdToast', 'excluirContato' , function($scope , $state, buscaContatos, $mdDialog, salvarContato, atualizarContato,$mdToast, excluirContato) {

        $scope.map;
        $scope.marker;

        $scope.favoritos = false;

        $scope.actionList = false;

        $scope.listResult = [];

        function mostrarContatos() {
            buscaContatos.query()
                .$promise.then(function (data) {
                $scope.listResult = data;
            })
            .catch(function (response) {
                console.log(response);
            })

        }

        mostrarContatos();

        $scope.initMap = function() {
            $scope.uluru = {lat: -25.363, lng: 131.044};
            $scope.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: $scope.uluru
            });

        }

        $scope.initMap();

        $scope.mostraLocalizacao = function (id) {
            $scope.listResult.forEach(function (contato) {
                if(id == contato.id){
                    $scope.geocoder = new google.maps.Geocoder();

                    $scope.geocoder.geocode({address: contato.endereco}, function(results, status) {

                        if (status == google.maps.GeocoderStatus.OK) {

                            $scope.myResult = results[0].geometry.location;

                            createMarker($scope.myResult);

                            $scope.map.setCenter($scope.myResult);

                            $scope.map.setZoom(17);
                        }
                    });
                }
            });
        }


        function createMarker(latlng) {

            if($scope.marker != undefined && $scope.marker != ''){
                $scope.marker.setMap(null);
                $scope.marker = '';
            }

            $scope.marker = new google.maps.Marker({
                map: $scope.map,
                position: latlng
            });
        }


        $scope.adicionarContato = function(ev) {
            $state.go('adicionar');
        };
        
        $scope.editarContato = function (id) {
            $state.go('editarcontato', {contatoId: id});
        }

        
        $scope.marcarFavorito = function (item) {
            $scope.actionList = true;

            setTimeout(function(){
                atualizarContato.update({contatoId: item.id}, item);
                if(item.favorito == true){
                    $scope.actionList = false;
                    $mdToast.show({
                        template: '<md-toast class="md-toast"><div class="md-toast-content success"><b>Contato adicionado aos favoritos!</b></div></md-toast>',
                        hideDelay: 2000,
                        position: 'right'
                    });
                } else {
                    $scope.actionList = false;
                    $mdToast.show({
                        template: '<md-toast class="md-toast"><div class="md-toast-content success"><b>Contato removido dos favoritos!</b></div></md-toast>',
                        hideDelay: 2000,
                        position: 'right'
                    });
                }
            }, 3500);
        }

        $scope.deletarContato = function (id) {
            $scope.actionList = true;
            setTimeout(function(){
                excluirContato.delete({contatoId: id})
                    .$promise.then(function (data) {
                        $scope.listResult.forEach(function (contato) {
                            if(contato.id == id){
                                var indice = $scope.listResult.indexOf(contato);
                                $scope.listResult.splice(indice, 1);
                            }
                        });
                    $scope.actionList = false;
                    $mdToast.show({
                        template: '<md-toast class="md-toast"><div class="md-toast-content success"><b>Contato deletado com sucesso!</b></div></md-toast>',
                        hideDelay: 2000,
                        position: 'right'
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
            }, 3500);
        }

    }]);
