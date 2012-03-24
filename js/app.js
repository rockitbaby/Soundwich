define([
  'jquery'
  , 'views/app_view'
], function(
  $
  , AppView
) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Default
      '*actions': 'defaultAction'
    },

    defaultAction: function(actions) {
      AppView.render();
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