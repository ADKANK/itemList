app.controller('editItemController', ['$scope', '$routeParams', '$location', 'ItemService', function ($scope, $routeParams, $location, ItemService) {
    let itemId = $routeParams.itemId;
    let itemToEdit = {};

    $scope.init = function () {
        ItemService.getItems().then(function (items) {
            console.log('Items fetched successfully:', items);

            itemToEdit = items.find(item => item.id == itemId);
            console.log('Item found:', itemToEdit);

            // If item is found, populate the input fields with the item's data
            if (itemToEdit) {
                $scope.itemName = itemToEdit.name;
                $scope.itemDescription = itemToEdit.description;
            } else {
                console.error('Item not found:', itemId);
            }
        }).catch(function (error) {
            console.error('Error fetching items:', error);
        });
    };

    $scope.init();

    // Function to update the item
    $scope.updateItem = function () {
        itemToEdit.name = $scope.itemName;
        itemToEdit.description = $scope.itemDescription;
        if (!itemToEdit.name) {
            alert("Name is required");
            return;
        }
        if (itemToEdit.description.length > 150) {
            alert("Description must be at most 150 characters long.");
            return;
        }
        ItemService.updateMockItem(itemToEdit);
        $location.path('/');
    }
}]);
