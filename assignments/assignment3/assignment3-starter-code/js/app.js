(
    function() {
        "use strict";

        angular.module("MenuListApp", [])
                .controller("MenuListDataRequestController", MenuListDataRequestController)
                .service("MenuListDataCrawlerService", MenuListDataCrawlerService)
                .directive("foundItems", FoundItemsDirective)
                .constant("MenuListDataSourceURL",
                        "https://davids-restaurant.herokuapp.com/menu_items.json");

        MenuListDataRequestController.$inject = ["MenuListDataCrawlerService"]
        function MenuListDataRequestController(MenuListDataCrawlerService) {
            var menuListReqCtrl = this;
            var service = MenuListDataCrawlerService;

            menuListReqCtrl.searchTxt = "";
            menuListReqCtrl.menuListItems = [];
            menuListReqCtrl.errorMessage = "";

            function setErrorMessage(message) {
                menuListReqCtrl.errorMessage = message;
            }

            function resetErrorMessage() {
                menuListReqCtrl.errorMessage = "";
            }

            function onMenuListDataRefreshed(newMenuList) {
                if (newMenuList.length === 0) {
                    setErrorMessage("Nothing found")
                } else {
                    resetErrorMessage();
                }

                menuListReqCtrl.menuListItems = newMenuList;
            }

            service.addMenuListDataObserver(onMenuListDataRefreshed);

            menuListReqCtrl.onSearchBtnClicked = function() {
                if (menuListReqCtrl.searchTxt === "") {
                    setErrorMessage("Nothing found");
                    menuListReqCtrl.menuListItems = [];
                } else {
                    resetErrorMessage();
                    service.refreshLatestMenuItemData(menuListReqCtrl.searchTxt);
                }
            };

            menuListReqCtrl.removeItem = function(index) {
                menuListReqCtrl.menuListItems.splice(index, 1);
            }
        }

        function FoundItemsDirective() {
            var ddo = {
                templateUrl: "listTemplate.html",
                scope: {
                    foundItemsList: "<",
                    onRemove: "&",
                    errorMessage: "@"
                }
            }

            return ddo;
        }

        MenuListDataCrawlerService.$inject = ["MenuListDataSourceURL", "$http"];
        function MenuListDataCrawlerService(MenuListDataSourceURL, $http) {
            var service = this;
            var menuListDataObserverList = [];

            function MenuItemData(name, shortName, description) {
                this.name = name;
                this.shortName = shortName;
                this.description = description;
            }

            service.addMenuListDataObserver = function(func) {
                menuListDataObserverList.push(func);
            }

            service.removeMenuListDataObserver = function(func) {
                var index = menuListDataObserverList.indexOf(func);

                if (index !== -1) {
                    menuListDataObserverList.splice(index, 1);
                }
            }

            function NotifyMenuListDataObservers(payloadData) {
                menuListDataObserverList.forEach(function(func) {
                    func(payloadData);
                });
            }
            
            service.refreshLatestMenuItemData = function(searchTxt) {
                $http({
                    url: MenuListDataSourceURL
                }).then(function(response) {
                    var latestMenuItemList = [];

                    var menuListItemArray = response.data.menu_items;
                    menuListItemArray.forEach(element => {
                        var description = element.description.toLowerCase();
                        if (description.indexOf(searchTxt.toLowerCase()) !== -1) {
                            var menuItem = new MenuItemData(element.name, 
                                element.short_name, element.description);
                            latestMenuItemList.push(menuItem);
                        }
                    });

                    // console.log(latestMenuItemList);
                    NotifyMenuListDataObservers(latestMenuItemList);
                }).catch(function(error) {
                    console.log("Something went wrong", error);
                })
            }
        }
    }
)();