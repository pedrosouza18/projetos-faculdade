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

        $scope.listResult = [];

        buscaContatos.query()
            .$promise.then(function (data) {
                $scope.listResult = data;
            })
            .catch(function (response) {
                console.log(response);
            })


        $scope.initMap = function() {

            $scope.uluru = {lat: -25.363, lng: 131.044};
            $scope.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: $scope.uluru
            });

        }

        google.maps.event.addDomListener(window, 'load', $scope.initMap);


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
        
        $scope.mostrarFavoritos = function () {
            $scope.listResult.forEach(function (contato) {
                if ($scope.favoritos == true && contato.favorito == true) {
                    return contato;
                } else if ($scope.favoritos == false && contato.favorito == true || contato.favorito == false) {
                    return contato;
                }
            });
        }

        $scope.adicionarContato = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                locals: {
                    object: $scope.object,
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
            });
        };

        $scope.salvaContato = function (object, lista) {
            if(object.id){
                atualizarContato.update({contatoId: object.id}, object);
                $mdToast.show({
                    template: '<md-toast class="md-toast"><div class="md-toast-content success"><b>Contato atualizado com sucesso!</b></div></md-toast>',
                    hideDelay: 3000,
                    position: 'right'
                });
            } else {

                lista.push(object);
                salvarContato.save(object);
                $mdToast.show({
                    template: '<md-toast class="md-toast"><div class="md-toast-content success"><b>Contato salvo com sucesso!</b></div></md-toast>',
                    hideDelay: 3000,
                    position: 'right'
                });
            }
        }
        
        $scope.editarContato = function (ev, item) {
            $mdDialog.show({
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
                });
        }

        function DialogController($scope, $mdDialog,object, lista, fnSave) {

            $scope.object = object;

            $scope.lista = lista;

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.salvar = function() {
                fnSave($scope.object, $scope.lista);
                $mdDialog.hide();
            };
        }
        
        $scope.marcarFavorito = function (item) {
            atualizarContato.update({contatoId: item.id}, item);
            if(item.favorito == true){
                $mdToast.show({
                    template: '<md-toast class="md-toast"><div class="md-toast-content success"><b>Contato adicionado aos favoritos!</b></div></md-toast>',
                    hideDelay: 2000,
                    position: 'right'
                });
            } else {
                $mdToast.show({
                    template: '<md-toast class="md-toast"><div class="md-toast-content success"><b>Contato removido dos favoritos!</b></div></md-toast>',
                    hideDelay: 2000,
                    position: 'right'
                });
            }
        }

        $scope.deletarContato = function (id) {
            excluirContato.delete({contatoId: id})
                .$promise.then(function (data) {
                    $scope.listResult.forEach(function (contato) {
                        if(contato.id == id){
                            var indice = $scope.listResult.indexOf(contato);
                            $scope.listResult.splice(indice, 1);
                        }
                    });

                $mdToast.show({
                    template: '<md-toast class="md-toast"><div class="md-toast-content success"><b>Contato deletado com sucesso!</b></div></md-toast>',
                    hideDelay: 2000,
                    position: 'right'
                });
            })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }]);
