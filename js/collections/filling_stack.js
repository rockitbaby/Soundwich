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
      
      getByKey: function(key) {
        var found = this.find(function(model){ return model.get('key') == key; });
        return found;
      },
      
      getNextToPrepare: function() {
        this.sortBy(function(model) { return 100 - model.get('order') });
        return this.find(function(model){ return model.get('prepared') === false; });
      },
      
      orderdFillings: function() {
        return this.sortBy(function(model) { return 100 - model.get('order') });
      },
  });
  
  return FillingStack;
  
});