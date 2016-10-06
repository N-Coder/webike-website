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
                    $http.get("api").success(function (data) {
                        $scope.WeBikes = data;
                        var phone_batteries = document.getElementsByClassName('phone_battery');
                        for (i = 0; i < phone_batteries.length; i++) {
                            if (phone_batteries[i].innerText <= 20) {
                                phone_batteries[i].style.color = "red";
                                phone_batteries[i].style.background = "pink"
                            }
                        }
                        var last_seen = document.getElementsByClassName('last_seen');
                        for (i = 0; i < last_seen.length; i++) {
                            if (last_seen[i].innerText <= daysAgo(60)) {
                                last_seen[i].style.background = "pink"
                            } else if (last_seen[i].innerText <= daysAgo(30)) {
                                last_seen[i].style.background = "yellow"
                            } else if (last_seen[i].innerText >= daysAgo(7)) {
                                last_seen[i].style.background = "green"
                            }
                        }
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