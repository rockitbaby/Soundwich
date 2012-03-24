define([
  'jquery'
], function(
  $
) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Default
      '*actions': 'defaultAction'
    },

    defaultAction: function(actions) {
       
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.history.start();
  };
  
  return { 
    initialize: initialize
  };

});