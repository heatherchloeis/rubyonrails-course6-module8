(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .factory("spa-demo.subjects.Thing", ThingFactory);

  ThingFactory.$inject = ["$resource","spa-demo.config.APP_CONFIG"];
  function ThingFactory($resource, APP_CONFIG) {
    var service = $resource(APP_CONFIG.server_url + "/api/things/:collectionRoute:id",
        { id: '@id',
          collectionRoute: '@collectionRoute'
        },
        { update: {method:"PUT"},
          search: { method: 'GET', isArray: true, params: {collectionRoute: 'search'} } 
        }
      );
    return service;
  }
})();