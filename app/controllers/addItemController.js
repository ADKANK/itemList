app.controller('addItemController', ['$scope', '$location', '$window', 'ItemService', function ($scope, $location, $window, ItemService) {
    // Initialize items array
    $scope.items = [];

    // Fetch existing items from localStorage on controller initialization
    fetchItemsFromLocalStorage();

    // Function to fetch existing items from localStorage
    function fetchItemsFromLocalStorage() {
        const storedItems = $window.localStorage.getItem('items');
        if (storedItems) {
            $scope.items = JSON.parse(storedItems);
        }
    }

    // Function to add item
    $scope.addItem = () => {
        // Validate name and description
        if (!$scope.itemName) {
            alert("Name is required");
            return;
        }

        if ($scope.itemDescription.length > 150) {
            alert("Description must be at most 150 characters long.")
            return;
        }

        // If validation passes, create the new item
        let newItem = {
            id: generateUniqueId(),
            name: $scope.itemName,
            description: $scope.itemDescription
        };

        // Add the new item to the list
        $scope.items.push(newItem);

        // Clear input fields
        $scope.itemName = '';
        $scope.itemDescription = '';

        // Save updated items to localStorage
        saveItemsToLocalStorage($scope.items);
        console.log("add items: " + $scope.items);

        // Update the mock data in the service
        ItemService.updateMockItems($scope.items);
        $location.path('/');
    };

    // Function to generate unique ID
    const generateUniqueId = () => {
        let itemIdCounter = parseInt(localStorage.getItem('itemIdCounter')) || 1; // Initialize to 1 if null
        localStorage.setItem('itemIdCounter', itemIdCounter + 1); // Increment the counter
        return itemIdCounter;
    };

    // Function to save items to localStorage
    function saveItemsToLocalStorage(items) {
        $window.localStorage.setItem('items', JSON.stringify(items));
    }
}]);
