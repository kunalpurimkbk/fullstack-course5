(
    function() {
        "use strict";

        angular.module("RestaurantModule")
                .service("CategoriesListCrawlerService", CategoriesListCrawlerService);

        CategoriesListCrawlerService.$inject = ["restaurantURL", "categoriesURL", "$http"];
        function CategoriesListCrawlerService(restaurantURL, categoriesURL, $http) {
            var service = this;

            service.getCategoriesList = function() {
                return $http({
                    url: (restaurantURL + categoriesURL)
                }).then(function(response) {
                    var data = response.data;
                    var listToBeReturned = data.map(function(element) {
                        return new Category(element.short_name, element.name);
                    });

                    return listToBeReturned;
                }).catch(function(error) {
                    console.log(error);
                    return null;
                });
            }
            
            function Category(shortName, name) {
                this.shortName = shortName;
                this.name = name;
            }
        }
    }
)();