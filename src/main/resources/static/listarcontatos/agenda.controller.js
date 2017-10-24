angular.module('agenda.listarContatos')
    .controller('ListarCtrl', ['$scope', '$state', 'buscaContatos', '$mdDialog', 'salvarContato', function($scope , $state, buscaContatos, $mdDialog, salvarContato) {

        $scope.map;
        $scope.marker;

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
                        console.log(contato.endereco);

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
            lista.push(object);
            salvarContato.save(object);
            console.log(object);
        }

        function DialogController($scope, $mdDialog,object, lista, fnSave) {

            $scope.object = object;
            $scope.lista = lista;

            console.log($scope.listResult);

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

    }]);
