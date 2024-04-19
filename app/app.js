const app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/itemList.html',
            controller: 'ItemController'
        })
        .when('/edititem/:itemId', {
            templateUrl: 'app/views/editItem.html',
            controller: 'editItemController'
        })
        .when('/additem', {
            templateUrl: 'app/views/addItem.html',
            controller: 'addItemController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.hashPrefix('');
}
]);

