(function () {
    angular.module("visual_status", [])
        .controller("MainController", ["$scope", "$http",
            function ($scope, $http) {
                $scope.commentVisible = [false];
                $scope.WeBikes = [];
                $scope.OrderedBy = 'sensor';
                $scope.reverse = false;
                $scope.order = function (OrderedBy) {
                    $scope.reverse = ($scope.OrderedBy === OrderedBy) ? !$scope.reverse : false;
                    $scope.OrderedBy = OrderedBy;
                };
                $scope.show_comment = function (id) {
                    $scope.commentVisible[id] = true
                };
                $scope.hide_comment = function (id) {
                    $scope.commentVisible[id] = false
                };
                $scope.edit_comment = function (id) {
                    var cmt = prompt("Please enter comment", "");
                    if (cmt === "") return;
                    $scope.WeBikes.filter(
                        function (bike) {
                            return (bike.sensor === id);
                        }
                    )[0].comment = cmt
                };
                window.onload = function () {
                    $http.get("/webike/visual_status/api").success(function (data) {
                        $scope.WeBikes = data;
                        var today = new Date();
                        $scope.WeBikes.forEach(function (bike) {
                            bike.last_seen_ago = Math.round((today - new Date(bike.last_seen)) / 86400000);
                        });
                    })
                }
            }]);
    function daysAgo(n) {
        var date = new Date(+new Date - 1000 * 60 * 60 * 24 * n);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        return (yyyy + "-" + mm + "-" + dd)
    }
}());
