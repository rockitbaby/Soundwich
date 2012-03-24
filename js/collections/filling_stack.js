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
  });
  
  return FillingStack;
  
});