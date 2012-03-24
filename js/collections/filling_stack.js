define([
  'jquery'
  , 'models/filling_appearance'
],
function (
  $
  , FillingAppearance
) {
  
  var FillingStack = Backbone.Collection.extend({
    
      model: FillingAppearance,
      
      comperator: function(filling) {
        return (1000 - filling.get('order'));
      },
      getByKey: function(key) {
        var found = this.find(function(model){ return model.get('key') == key; });
        return found;
      },
      
      getNextToPrepare: function() {
        
        return this.find(function(model){ return model.get('prepared') === false; });
      },
      
      orderdFillings: function() {
        return this.sortBy(function(model) { return 100 - model.get('order') });
      },
  });
  
  return FillingStack;
  
});