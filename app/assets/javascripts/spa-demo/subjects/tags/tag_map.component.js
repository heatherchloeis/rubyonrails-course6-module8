(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .component("sdTagMap", {
      template: "<div class='image-map col-sm-10 col-md-10 col-lg-10' id='map'></div>",
      controller: TagMapController,
      bindings: {
        zoom: "@"
      }
    });

  TagMapController.$inject = ["$scope",
                                  "$q",
                                  "$element",
                                  "spa-demo.geoloc.currentOrigin",
                                  "spa-demo.geoloc.myLocation",
                                  "spa-demo.geoloc.Map",
                                  "spa-demo.subjects.currentSubjects",
                                  "spa-demo.config.APP_CONFIG",
                                  "spa-demo.subjects.TagThing"];
  function TagMapController($scope, $q, $element,
                            currentOrigin, myLocation, Map, 
                            currentSubjects, APP_CONFIG, TagThing) {
    var vm=this;


    vm.$onInit = function() {
      console.log("TagImagesMapController",$scope);
    }


    vm.$postLink = function() {
      var element = $element.find('div')[0];
      getLocation().then(
        function(location){
          vm.location = location;
          initializeMap(element, location.position);
        });

      $scope.$watch(
        function(){ return TagThing.getTagThing(); },
        function(thing) {
          if (thing === null) {
            return;
          }
          vm.images = thing.images;
          displayImages();
        });
    }


    return;
    //////////////
    function getLocation() {
      var deferred = $q.defer();

      //use current address if set
      var location = currentOrigin.getLocation();
      if (!location) {
        //try my location next
        myLocation.getCurrentLocation().then(
          function(location){
            deferred.resolve(location);
          },
          function(){
            deferred.resolve({ position: APP_CONFIG.default_position});
          });
      } else {
        deferred.resolve(location);
      }

      return deferred.promise;
    }


    function initializeMap(element, position) {
      vm.map = new Map(element, {
        center: position,
        zoom: vm.zoom || 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      vm.map.clearMarkers();
    }


    function displayImages(){
      if (!vm.map) { return; }
      vm.map.clearMarkers();
      angular.forEach(vm.images, function(image){
        displayImage(image);
      });
    }


    function displayImage(image) {
      var markerOptions = {
        position: {
          lng: image.position.lng,
          lat: image.position.lat
        },
        image_id: image.id
      };
      markerOptions.title = image.caption;
      markerOptions.content = vm.imageInfoWindow(image);
      vm.map.displayMarker(markerOptions);
    }
  }


  TagMapController.prototype.updateOrigin = function() {
    if (this.map && this.location) {
      this.map.center({
        center: this.location.position
      });
      this.map.displayOriginMarker(this.originInfoWindow(this.location));
    }
  }


  TagMapController.prototype.originInfoWindow = function(location) {
    console.log("originInfo", location);
    var full_address = location ? location.formatted_address : "";
    var lng = location && location.position ? location.position.lng : "";
    var lat = location && location.position ? location.position.lat : "";
    var html = [
      "<div class='origin'>",
        "<div class='full_address'>"+ full_address + "</div>",
        "<div class='position'>",
          "lng: <span class='lng'>"+ lng +"</span>",
          "lat: <span class='lat'>"+ lat +"</span>",
        "</div>",
      "</div>",
    ].join("\n");

    return html;
  }


  TagMapController.prototype.imageInfoWindow = function(image) {
    console.log("imageInfo", image);
    var html ="<div class='image-marker-info'><div>";
      html += "<span class='id image_id'>"+ image.id+"</span>";
      if (image.caption) {
        html += "<span class='image-caption'>"+ image.caption + "</span>";
      }
      html += "</div><img src='"+ image.content_url+"?width=150'>";
      html += "</div>";
    return html;
  }


})();