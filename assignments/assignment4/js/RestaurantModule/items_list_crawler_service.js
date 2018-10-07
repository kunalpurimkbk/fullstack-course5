(
    function() {
        "use strict";

        angular.module("RestaurantModule")
                .service("ItemsListCrawlerService", ItemsListCrawlerService);

        ItemsListCrawlerService.$inject = ["restaurantURL", "menuItemsURL",
                                        "menuItemsURLCategoryExtraData", "$http"];
        function ItemsListCrawlerService(restaurantURL, menuItemsURL,
                                    menuItemsURLCategoryExtraData ,$http) {
            var service = this;

            service.getItemsList = function(categoryShortName) {
                return sendHttpRequest(categoryShortName);
            }

            function sendHttpRequest(categoryShortName) {
                return $http({
                    url: (restaurantURL + menuItemsURL + "?" +
                                menuItemsURLCategoryExtraData + "=" + categoryShortName)
                }).then(function(response) {
                    var data = response.data;
                    var listToBeReturned = data.menu_items.map(function(element) {
                        return new Item(element.name);
                    });

                    return listToBeReturned;
                }).catch(function(error) {
                    console.log(error);
                    return null;
                });
            }
            
            function Item(name) {
                this.name = name;
            }
        }
    }
)();