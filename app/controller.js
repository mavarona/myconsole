angular.module('myApp')
    .controller('MyController', ['$scope', 'myconsole', '$http',

        function($scope, myconsole, $http) {
            $scope.arrObJMessage = [{
                    Nombre: "Congrio común",
                    Orden: "Anguilliformes",
                    Suborden: "Congroidei"
                },
                {
                    Nombre: "Merluza europea",
                    Orden: "Gadiformes",
                    Suborden: "Paracanthopterygii"
                },
                {
                    Nombre: "Txitxarro",
                    Orden: "Perciformes",
                    Suborden: "Percoidei"
                }
            ];
            $scope.arrGroupMessage = ["Darth vader", "Leia Organa", "Luke Akywalker", "Boba Fett", "Padmé Amidala", "Han Solo", "Kylo Ren"];
            myconsole.activate(true);
            $scope.callNotify = function(msg, type, style) {
                myconsole.println(msg, {
                    type: type,
                    style: style
                });
            };
            $scope.getPhotos = function() {
                myconsole.startChrono('getApiInfo');
                $http.get('https://jsonplaceholder.typicode.com/photos')
                    .then(function(photos) {
                        var {
                            data
                        } = photos;
                        data = data.map(({
                            albumId,
                            id,
                            title,
                            url,
                            thumbnailUrl
                        }) => [albumId, id, title, url, thumbnailUrl]);
                        $('#photos').DataTable({
                            data: data
                        });
                        myconsole.stopChrono('getApiInfo');
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            };
            $scope.timeLog = function() {
                myconsole.startChrono();
                alert("Click to continue and call timeLog");
                myconsole.logChrono();
                alert("Finish Chrono");
                myconsole.stopChrono();
            };
            $scope.showTable = function() {
                myconsole.showTable($scope.arrObJMessage);
            };
            $scope.startGroup = function() {
                myconsole.startGroup($scope.arrGroupMessage);
            };
            $scope.stopGroup = function() {
                myconsole.stopGroup();
            };
            $scope.getListStyles = function() {
                myconsole.getPropsDom($scope.selector);
            };
        }

    ]);