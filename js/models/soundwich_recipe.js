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
        fillings: new FillingStack(),
      },
      
      reset: function() {
        
        this.get('fillings').each(function(filling) {
          filling.set({'prepared' : false});
        });
      }
  });

  return SoundwichRecipe;
  
});