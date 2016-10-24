(function() {
 'use strict';

 angular.module('ShoppingListCheckOff', [])
 .controller('ToBuyController', ToBuyController)
 .controller('AlreadyBoughtController', AlreadyBoughtController)
 .service('ShoppingListCheckoffService', ShoppingListCheckoffService);

 ToBuyController.$inject = ['ShoppingListCheckoffService'];
 function ToBuyController(ShoppingListCheckoffService) {
   var toBuy = this;

   //toBuy.shouldShowMessage = ShoppingListCheckoffService.showMessage();
   //toBuy.displayMessage = "Everything is bought!";
   toBuy.toBuyList = ShoppingListCheckoffService.getToBuyList();
   toBuy.toBuyListLength = ShoppingListCheckoffService.getBuyListLength();

   toBuy.buyItem =  function(name, quantity)
    {
      var item = {
        name:name,
        quantity:quantity
      };

      ShoppingListCheckoffService.updateBuyList(item);
    }
}

  AlreadyBoughtController.$inject = ['ShoppingListCheckoffService'];
  function AlreadyBoughtController(ShoppingListCheckoffService) {
    var alreadyBought = this;

    alreadyBought.alreadyBoughtList = ShoppingListCheckoffService.getBoughtList();
   }

  function ShoppingListCheckoffService() {
     var service = this;

     //list of service
     var toBuyList = [{name:"Cookies",quantity:3}, {name:"Chips",quantity:2}];
     var boughtList = [];

     service.getToBuyList = function()
     {
       return toBuyList;
     }

     service.getBuyListLength = function()
     {
       return toBuyList.length;
     }


     service.getBoughtList = function()
     {
       return boughtList;
     }

     service.updateBuyList = function(item)
     {
       // Find and remove item from an array
       var i = toBuyList.indexOf(item);

       for(var i = toBuyList.length - 1; i >= 0; i--)
       {
        if(toBuyList[i].name == item.name)
        {
          toBuyList.splice(i, 1);
        }
       }

       boughtList.push(item);

     };
 }
})();
