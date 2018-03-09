(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .service("spa-demo.subjects.TagThing", TagThing);

  function TagThing() {
    var service = this;
    service.tagThing = null;
    service.getTagThing = getTagThing;
    service.setTagThing = setTagThing;
    return;

    function getTagThing(){
      return service.tagThing;
    }

    function setTagThing(thing){
      service.tagThing = thing;
      console.log("TagThing service: ", service.tagThing);
    }
  }
})();