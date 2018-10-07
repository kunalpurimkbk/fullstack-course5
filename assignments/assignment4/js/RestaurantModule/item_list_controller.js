(
    function() {
        "use strict";

        angular.module("RestaurantModule")
                .controller("ItemListController", ItemListController);

        ItemListController.$inject = ["items"];
        function ItemListController(items) {
            var itemListCtrl = this;
            itemListCtrl.itemsList = items;
        }
    }
)();