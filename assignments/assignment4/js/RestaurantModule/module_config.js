(
    function() {
        "use strict";

        angular.module("RestaurantModule")
                .config(ModuleConfig);

        ModuleConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
        function ModuleConfig($stateProvider, $urlRouterProvider) {
            $stateProvider.state("home", {
                url: "/",
                templateUrl: "templates/RestaurantModule/home.html"
            }).state("categories", {
                url: "/categories",
                templateUrl: "templates/RestaurantModule/categories.html",
                controller: "CategoriesListController as categoryListCtrl",
                resolve: {
                    categories: ["CategoriesListCrawlerService",
                                    function(CategoriesListCrawlerService) {
                                        return CategoriesListCrawlerService.getCategoriesList();
                                    }]
                }
            }).state("itemList", {
                url: "/itemList/{category}",
                templateUrl: "templates/RestaurantModule/items.html",
                controller: "ItemListController as itemListCtrl",
                resolve: {
                    items: ['ItemsListCrawlerService', '$stateParams', 
                                function(ItemsListCrawlerService, $stateParams) {
                        console.log($stateParams.category)
                        return ItemsListCrawlerService.getItemsList($stateParams.category);
                    }]
                }
            })

            $urlRouterProvider.otherwise("/");
        }
    }
)();