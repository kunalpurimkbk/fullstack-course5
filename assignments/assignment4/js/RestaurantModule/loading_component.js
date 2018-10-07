(
    function() {
        "use strict";

        angular.module("RestaurantModule")
                .component("loadingImg", {
                    templateUrl: "templates/RestaurantModule/loading.html",
                    controller: LoadingController
                });

        LoadingController.$inject = ["$transitions"];
        function LoadingController($transitions) {
            var $ctrl = this;
            var cancellers = [];

            $ctrl.isLoading = false;

            $ctrl.$onInit = function () {
                console.log($transitions);

                $transitions.onStart({}, function(trans) {
                    $ctrl.isLoading = true;
                });

                $transitions.onSuccess({}, function(trans) {
                    $ctrl.isLoading = false;
                });

                $transitions.onError({}, function(trans) {
                    $ctrl.isLoading = false;
                });
            };
        }
    }
)();