define([
  'jquery'
  , 'collections/filling_stack'
],
function (
  $
  , FillingStack
) {
    
  var SoundwichRecipe = Backbone.Model.extend({
      defaults: {
        name: 'untitled',
        creator: 'unknown',
        description: '',
        fillings: new FillingStack()
      }
  });

  return SoundwichRecipe;
  
});