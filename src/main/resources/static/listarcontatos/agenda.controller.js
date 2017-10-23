angular.module('agenda.listarContatos')
    .controller('ListarCtrl', ['$scope', '$state', 'buscaContatos', function($scope , $state, buscaContatos) {

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

    }]);
