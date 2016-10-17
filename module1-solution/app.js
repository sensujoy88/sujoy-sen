(function() {
 'use strict';

 angular.module('LunchCheck', [])
 .controller('LunchCheckController', LunchCheckController);

 LunchCheckController.$inject = ['$scope'];
 function LunchCheckController($scope) {
   $scope.lunchList = "";
   $scope.lunchMessage = "";

  $scope.updateLunchMessage = function()
  {
    if($scope.lunchList.length == 0)
    {
      $scope.lunchMessage = "Please enter data first";
    }
    else
    {
      if(lunchSplit($scope.lunchList) <= 3)
      {
        $scope.lunchMessage = "Enjoy!";
      }
      else
      {
        $scope.lunchMessage = "Too much!";
      }
    }
  }

  function lunchSplit(string) {
     var array = string.split(',');
     return array.length;
 }

}

})();
