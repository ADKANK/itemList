app.service('ItemService', ['$window', function ($window) {
    // Load items from localStorage on service initialization
    let mockItems = JSON.parse($window.localStorage.getItem('mockItems')) || [];

    this.getItems = () => {
        // Create a promise that resolves immediately with the mockItems data
        return new Promise(function (resolve, reject) {
            resolve(mockItems);
        });
    };
    this.updateMockItems = function (items) {
        // Update mock items with new items
        mockItems = items;
        // Store items in localStorage
        $window.localStorage.setItem('mockItems', JSON.stringify(items));
    };

    this.updateMockItem = function (updatedItem) {
        let index = mockItems.findIndex(item => item.id === updatedItem.id);
        console.log("Index: ", index);
        if (index !== -1) {
            mockItems[index] = updatedItem;
            $window.localStorage.setItem('items', JSON.stringify(mockItems)); // Update the entire array
            this.updateMockItems(mockItems); // Update the service's mockItems array
            return Promise.resolve('Item updated successfully');
        } else {
            return Promise.reject('Item not found');
        }
    };

}]);
