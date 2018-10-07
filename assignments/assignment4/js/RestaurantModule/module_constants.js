(
    function() {
        "use strict";

        angular.module("RestaurantModule")
        .constant("restaurantURL", "https://davids-restaurant.herokuapp.com/")
        .constant("categoriesURL", "categories.json")
        .constant("menuItemsURL", "menu_items.json")
        .constant("menuItemsURLCategoryExtraData", "category");
    }
)();