define([
  'jquery'
  , 'views/app_view'
  , 'collections/parameter_library'
  , 'collections/filling_library'
  , 'collections/filling_stack'
  , 'models/filling_appearance'
  , 'models/soundwich_recipe'
], function(
  $
  , AppView
  , ParameterLibrary
  , FillingLibrary
  , FillingStack
  , FillingAppereance
  , SoundwichRecipe
) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Default
      'eat/:id': 'eat',
      '*actions': 'defaultAction'
    },

    defaultAction: function(actions) {

      //AppView.render();
      
    },
    
    eat: function(id) {
      console.log("EAT Amsterdam");
      AppView.loadSoundwich(id);
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