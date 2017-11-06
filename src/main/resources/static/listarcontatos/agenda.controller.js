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

        buscaContatos.query()
            .$promise.then(function (data) {
                $scope.listResult = data;
                console.log($scope.listResult);
            })
            .catch(function (response) {
                console.log(response);
            })


        $scope.initMap = function() {
            console.log('iniciado');
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

        $scope.salvaContato = function (item, lista) {
            if(item.id){
                console.log('atualizar');
                atualizarContato.update({contatoId: item.id}, item);
                    $mdToast.show({
                        template: '<md-toast class="md-toast"><div class="md-toast-content success"><b>Contato atualizado com sucesso!</b></div></md-toast>',
                        hideDelay: 3000,
                        position: 'right'
                });
            } else {

                console.log('salvar');
                lista.push(item);

                salvarContato.save(item);
                $mdToast.show({
                    template: '<md-toast class="md-toast"><div class="md-toast-content success"><b>Contato salvo com sucesso!</b></div></md-toast>',
                    hideDelay: 3000,
                    position: 'right'
                });
            }
        }
        
        $scope.editarContato = function (ev, item) {
            console.log(item.id);
            /*$mdDialog.show({
                controller: DialogController,
                locals: {
                    object: item,
                    lista: $scope.listResult,
                    fnSave: $scope.salvaContato
                },
                templateUrl: 'listarcontatos/dialog/adicionar-contato.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });*/
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
