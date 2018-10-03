(
    function() {
        "use strict";
        angular.module("LunchCheck", [])

                .controller("LunchCheckController", LunchCheckController);
        LunchCheckController.$inject = ["$scope"];
        function LunchCheckController($scope) {
            $scope.listOfItems = "";
            $scope.lunchStatus = "";
            $scope.lunchStatusColor = "black";

            $scope.onCheckButtonClicked = function() {
                var numberOfItems = getNumberOfItems($scope.listOfItems);
                var resultStr = "";
                var resultColor = "";

                if (numberOfItems == 0) {
                    resultStr = "Please enter data first";
                    resultColor = "red";
                } else if (numberOfItems <= 3) {
                    resultStr = "Enjoy!";
                    resultColor = "green";
                } else {
                    resultStr = "Too much!";
                    resultColor = "green";
                }

                $scope.lunchStatus = resultStr;
                $scope.lunchStatusColor = resultColor;
            }

            var getNumberOfItems = function(str) {
                if (str == '') {
                    return 0;
                }

                var listOfItems = str.split(",");
                var length = 0;

                listOfItems.forEach(function(value) {
                    var trimmedValue = value.trim();
                    console.log("[" + trimmedValue + "]");
                    if (trimmedValue != "") {
                        length = length + 1;
                    }
                });
                
                console.log(length);
                return length;
            }
        }
    }
)();