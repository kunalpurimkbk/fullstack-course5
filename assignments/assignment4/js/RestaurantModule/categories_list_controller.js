(
    function() {
        "use strict";

        angular.module("RestaurantModule")
                .controller("CategoriesListController", CategoriesListController);

        CategoriesListController.$inject = ["categories"];
        function CategoriesListController(categories) {
            var categoryListCtrl = this;
            categoryListCtrl.categories = categories;
        }
    }
)();