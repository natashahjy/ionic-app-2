angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatCtrl', function($scope, favService, gsmService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.refresh = function() {
    var ids = favService.all(); // Retrieves an array of event ids
    $scope.favs = []; // JS array
      for (var i = 0; i < ids.length; i++) { // Async task to retrieve each event by id
        eventService.get(ids[i]).then(function(event) {
        $scope.favs.push(event); // Add to array
        });
     }
  }

 // With the new view caching in Ionic, Controllers are only called
 // when they are recreated or on app start, instead of every page change.
 // To listen for when this page is active (for example, to refresh data),
 // listen for the $ionicView.enter event:
 $scope.$on('$ionicView.enter', function(e) {
    $scope.refresh();
 });
    
 $scope.remove = function(event) { // Remove from local storage
    favService.delete(event.id); // Remove from UI
    var index = undefined;
    for (var i = 0; i < $scope.favs.length; i++) {
        if ($scope.favs[i] == event.id)
            index = i;
    }
    if (index != undefined)
        $scope.favs.splice(index, 1); // Refresh list view
        $scope.refresh();
    };
})

.controller('gsmSearchCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    $scope.gsms = [];
    
    gsmService.getByGsm(gsm).then(function(result) {
    for(var i=0; i<result.length; i++){
        var gsm = {};
        gsm.id = result[i].id;
        gsm.school = result[i].school;
        gsm.name = result[i].name;
        gsm.module = result[i].module;
        gsm.img = result[i].img;
        gsm.favIcon = favService.isFav(result[i].id) ? "ion-ios-heart" : "ion-ios-heart-outline";
        $scope.gsms.push(gsm);
    }
});
                              
    $scope.toggleFav = function(event) {
    if (!favService.isFav(event.id)) { 
        favService.add(event.id);
        gsm.favIcon = "ion-ios-heart"; }
    else { 
        favService.delete(event.id);
        gsm.favIcon = "ion-ios-heart-outline"; }
    }                        
}])
   
.controller('schoolCtrl', ['$scope', '$stateParams', 'gsmService', 'favService',
function ($scope, $stateParams, gsmService, favService) {

    // Obtain country parameter from RouteProvider
    var school = $stateParams.school;

    $scope.refresh = function() {
     $scope.gsms = []; // Empty array
      gsmService.getByGsm(gsm).then(function(result) {
        for(var i=0; i<result.length; i++){
            var gsm = {};
            gsm.id = result[i].id;
            gsm.school = result[i].school;
            gsm.name = result[i].name;
            gsm.module = result[i].module;
            gsm.img = result[i].img;
            gsm.favIcon = favService.isFav(result[i].id) ? "ion-ios-heart" : "ion-ios-heart-outline";
            $scope.gsms.push(gsm);
        }
    });
}

    $scope.$on('$ionicView.enter', function(e) {
        $scope.refresh();
    });
    
     $scope.toggleFav = function(event) {
     if (!favService.isFav(event.id)) // Add to fav
        favService.add(event.id);
     else // Remove from fav
        favService.delete(event);
     }
}]) 

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
