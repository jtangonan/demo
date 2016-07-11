angular.module("recipeApp")
.controller("RecipeController", ["$http", "$scope", "$resource", "$filter",  function($http, $scope, $resource, $filter) {
    $scope.newRecipe = { image:"", title:"", summary:"", date:"" };
    var myData = $scope;
    $http.get("./recipes.json")
        .then(function(resp){
            myData.recipes = resp.data.recipes;
        });

    $scope.addRecipe = function(nr) {
        var Recipes = $resource("./recipes.json");
        var data = Recipes.get({}, function(){
            data.recipes[data.recipes.length] = {
                "image": "cookbooks_blog.jpg",
                "title": nr.title,
                "summary": nr.summary,
                "date": $filter('date')(Date.now, "MMM d, yyyy", "+0000")
            };
            data.$save();
        });
    };
}]);
