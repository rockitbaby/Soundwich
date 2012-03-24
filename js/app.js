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
      '*actions': 'defaultAction'
    },

    defaultAction: function(actions) {
      
      console.log(ParameterLibrary.getByKey('artist'));
      console.log(FillingLibrary.getByKey('lastfm.coversongs'));
      

      
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