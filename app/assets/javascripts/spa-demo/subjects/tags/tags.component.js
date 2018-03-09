(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .component("sdTags", {
      templateUrl: templateUrl,
      controller: TagsController
    });

  templateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function templateUrl(APP_CONFIG) {
    return APP_CONFIG.tags_html;
  }

  TagsController.$inject = ['$scope',
                              "spa-demo.subjects.Tag",
                              "spa-demo.subjects.Thing",
                              "spa-demo.subjects.TagThing"];
  function TagsController($scope, Tag, Thing, TagThing) {
    var vm = this;
    vm.tags = [];
    vm.things = [];
    vm.tagTag = null;
    vm.clickThing = tagThing;
    $scope.changeTag = tagChanged;

    activate();
    return;

    function activate() {
      loadTags();
    }

    function loadTags(){
      Tag.query().$promise
        .then(function(response){
          vm.tags = response;
        }).catch(function(error){
          console.log("tags error: " + error);
        });
    }

    function tagChanged(tag){
      search(tag);
    }

    function search(tag){
      var params = {tag_id:tag.id};
      Thing.search(params).$promise
        .then(function(response){
          vm.things = response;
        }).catch(function(error){
          console.log("things search error: ", error);
        });
    }

    function tagThing(thing){
      Thing.get({id:thing.id}).$promise
        .then(function(response){
          console.log("tagThing: ", response.images);
          TagThing.setTagThing(response);
        }).catch(function(error){
          console.log("tagThing error: ", error);
        });
    }

  }
})();