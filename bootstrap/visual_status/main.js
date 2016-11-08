(function () {
    angular.module("visual_status", [])
        .controller("MainController", ["$scope", "$http",
            function ($scope, $http) {
                $scope.WeBikes = [];
                $scope.OrderedBy = 'sensor';
                $scope.reverse = false;
                $scope.date = new Date();
                $scope.order = function (OrderedBy) {
                    $scope.reverse = ($scope.OrderedBy === OrderedBy) ? !$scope.reverse : false;
                    $scope.OrderedBy = OrderedBy;
                };
                $scope.reload = function () {
                    $scope.date.setUTCHours(0, 0, 0, 0);
                    $http.get("/webike/visual_status/api?date=" + $scope.date.toISOString()).success(function (data) {
                        $scope.WeBikes = data;
                        $scope.WeBikes.forEach(function (bike) {
                            bike.last_seen_ago = Math.round(($scope.date - new Date(bike.last_seen)) / 86400000);
                        });
                    })
                };
                $scope.reset_date = function () {
                    $scope.date = new Date();
                    $scope.reload()
                };
                window.onload = $scope.reload
            }]);
}());
