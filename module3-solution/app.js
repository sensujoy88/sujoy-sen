(function () {
'use strict';

angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      list: '<',
      onRemove: '&'
    }
  };
  return ddo;
}
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;

  narrow.searchTerm = '';
  narrow.found = [];

  narrow.searchItems = function() {
    if (narrow.searchTerm.length === 0)
      narrow.found = [];
    else {
      MenuSearchService.getMatchedMenuItems(narrow.searchTerm)
      .then(function (response) {
        narrow.found = response;
      }, function (response) {
        console.log("Error:" + error);
      })
    }
  }
  narrow.onRemove = function(index) {
    narrow.found.splice(index, 1);
  }
}

MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
                   method: "GET",
                   url: "https://davids-restaurant.herokuapp.com/menu_items.json" })
    .then(function (result) {
        var foundItems = result.data.menu_items;
        var returnedItems = [];

        // iterate over foundItems to get the one's that are needed
        for (var i in foundItems) {
          if (foundItems[i].description.indexOf(searchTerm) != -1)
            returnedItems.push(foundItems[i]);
        }
        return returnedItems;
    })
    .catch(function (error) {
      return null;
    })
  }
}

})();
