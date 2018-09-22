(
    function() {
        angular.module("ShoppingCartApp", [])
                .controller("ToBeBoughtListController", ToBeBoughtListController)
                .controller("AlreadyBoughtListController", AlreadyBoughtListController)
                .provider("ItemListService", ItemListServiceProvider);

        ToBeBoughtListController.$inject = ["ItemListService"];
        function ToBeBoughtListController(ItemListService) {
            var toBeBoughtCtrl = this;
            var service = ItemListService();

            toBeBoughtCtrl.toBeBoughtItemsList = service.getToBeBoughtItems();
            
            toBeBoughtCtrl.onBuyButtonClicked = function(index) {
                service.buyItem(index);
            }
        }

        AlreadyBoughtListController.$inject = ["ItemListService"];
        function AlreadyBoughtListController(ItemListService) {
            var alreadyBoughtCtrl = this;
            var service = ItemListService();

            alreadyBoughtCtrl.alreadyBoughtItemsList = service.getAlreadyBoughtItems();
        }

        function Item(itemName, itemQty) {
            this.itemName = itemName;
            this.itemQty = itemQty;
        }

        function ItemListService() {
            var service = this;

            var toBeBoughtItems = [];
            var alreadyBoughtItems = [];

            {
                toBeBoughtItems.push(new Item("Cookies", "3"));
                toBeBoughtItems.push(new Item("Chips", "4"));
                toBeBoughtItems.push(new Item("Sugary Drink", "10"));
                toBeBoughtItems.push(new Item("Pepto Bismol", "2"));
                toBeBoughtItems.push(new Item("Cookies", "10"));
            }

            service.getToBeBoughtItems = function() {
                return toBeBoughtItems;
            }

            service.getAlreadyBoughtItems = function() {
                return alreadyBoughtItems;
            }

            service.buyItem = function(itemIndex) {
                var itemBought = toBeBoughtItems[itemIndex];
                toBeBoughtItems.splice(itemIndex, 1);

                alreadyBoughtItems.push(itemBought);
            }
        }

        function ItemListServiceProvider() {
            var provider = this;
            provider.$get = function() {
                var factory = function() {
                    if (factory.prototype.instance == null) {
                        factory.prototype.instance = new ItemListService();
                    }

                    return factory.prototype.instance;
                }

                factory.prototype.instance = null;
                return factory;
            }
        }
    }
)();