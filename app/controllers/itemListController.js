app.controller('ItemController', ['$scope', '$location', '$window', 'ItemService', function ($scope, $location, $window, ItemService) {
    // Function to fetch items
    function fetchItems() {
        // Check if items exist in localStorage
        if ($window.localStorage.getItem('items')) {
            $scope.items = JSON.parse($window.localStorage.getItem('items'));
            ItemService.updateMockItems($scope.items); // Update mock items in the service
        } else {
            // Fetch items from the service if not found in localStorage
            ItemService.getItems().then(function (items) {
                $scope.items = items;
                saveItemsToLocalStorage(); // Save items to localStorage
            });
        }
    }

    // Function to save items to localStorage
    function saveItemsToLocalStorage() {
        $window.localStorage.setItem('items', JSON.stringify($scope.items));
    }

    // Initial fetch of items
    fetchItems();

    // Delete an item
    $scope.deleteItem = function (itemId) {
        let index = $scope.items.findIndex(item => item.id === itemId);
        $scope.items.splice(index, 1);
        saveItemsToLocalStorage(); // Save updated items to localStorage
        ItemService.updateMockItems($scope.items);
    };

    // Edit an item
    $scope.editItem = function (itemId) {
        $location.path('/edititem/' + itemId);
    };

    // Navigate to the add item page
    $scope.addItem = function () {
        $location.path('/additem');
    };
}]);